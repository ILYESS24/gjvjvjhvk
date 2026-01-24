import {
  convertToModelMessages,
  extractReasoningMiddleware,
  streamText,
  wrapLanguageModel,
} from "ai";
import { getSubscribedUser } from "@/lib/auth";
import { parseError } from "@/lib/error/parse";
import { gateway } from "@/lib/gateway";
import { logger } from "@/lib/logger";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { trackCreditUsage } from "@/lib/stripe";
import { chatRequestSchema, validateRequest } from "@/lib/validation";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limit: 60 requests per minute per user
const RATE_LIMIT = { limit: 60, windowSeconds: 60 };

export const POST = async (req: Request) => {
  let userId: string | undefined;

  try {
    // Auth check
    const user = await getSubscribedUser();
    userId = user.id;

    // Rate limiting
    const rateLimitResult = checkRateLimit(`chat:${userId}`, RATE_LIMIT);
    if (!rateLimitResult.success) {
      logger.warn("Rate limit exceeded", { userId, route: "/api/chat" });
      return rateLimitResponse(rateLimitResult.reset);
    }

    // Validate request body
    const validation = await validateRequest(req, chatRequestSchema);
    if (!validation.success) {
      logger.warn("Validation failed", { userId, error: validation.error });
      return new Response(validation.error, { status: 400 });
    }

    const { messages, modelId } = validation.data;

    logger.apiRequest("/api/chat", "POST", userId, { modelId });

    const { models } = await gateway.getAvailableModels();
    const model = models.find((m) => m.id === modelId);

    if (!model) {
      return new Response("Invalid model", { status: 400 });
    }

    const enhancedModel = wrapLanguageModel({
      model: gateway(model.id),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    });

    const result = streamText({
      model: enhancedModel,
      system: [
        "You are a helpful assistant that synthesizes an answer or content.",
        "The user will provide a collection of data from disparate sources.",
        "They may also provide instructions for how to synthesize the content.",
        "If the instructions are a question, then your goal is to answer the question based on the context provided.",
        model.id.startsWith("grok") &&
          "The user may refer to you as @gork, you can ignore this",
        "You will then synthesize the content based on the user's instructions and the context provided.",
        "The output should be a concise summary of the content, no more than 100 words.",
      ].join("\n"),
      messages: convertToModelMessages(messages),
      onError: (error) => {
        logger.apiError("/api/chat", error instanceof Error ? error : new Error(String(error)), userId);
      },
      onFinish: async ({ usage }) => {
        const inputCost = model.pricing?.input
          ? Number.parseFloat(model.pricing.input)
          : 0;
        const outputCost = model.pricing?.output
          ? Number.parseFloat(model.pricing.output)
          : 0;
        const inputTokens = usage.inputTokens ?? 0;
        const outputTokens = usage.outputTokens ?? 0;

        await trackCreditUsage({
          action: "chat",
          cost: inputCost * inputTokens + outputCost * outputTokens,
        });
      },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      sendSources: true,
    });
  } catch (error) {
    const errorInstance = error instanceof Error ? error : new Error(String(error));
    logger.apiError("/api/chat", errorInstance, userId);
    
    const message = parseError(error);
    const status = message.includes("Unauthorized") || message.includes("auth") ? 401 : 500;
    
    return new Response(message, { status });
  }
};
