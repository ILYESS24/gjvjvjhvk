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
import { codeRequestSchema, validateRequest } from "@/lib/validation";

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
    const rateLimitResult = checkRateLimit(`code:${userId}`, RATE_LIMIT);
    if (!rateLimitResult.success) {
      logger.warn("Rate limit exceeded", { userId, route: "/api/code" });
      return rateLimitResponse(rateLimitResult.reset);
    }

    // Validate request body
    const validation = await validateRequest(req, codeRequestSchema);
    if (!validation.success) {
      logger.warn("Validation failed", { userId, error: validation.error });
      return new Response(validation.error, { status: 400 });
    }

    const { messages, modelId, language } = validation.data;

    logger.apiRequest("/api/code", "POST", userId, { modelId, language });

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
        `Output the code in the language specified: ${language ?? "javascript"}`,
        "If the user specifies an output language in the context below, ignore it.",
        "Respond with the code only, no other text.",
        "Do not format the code as Markdown, just return the code as is.",
      ].join("\n"),
      messages: convertToModelMessages(messages),
      onError: (error) => {
        logger.apiError("/api/code", error instanceof Error ? error : new Error(String(error)), userId);
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
          action: "code",
          cost: inputCost * inputTokens + outputCost * outputTokens,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const errorInstance = error instanceof Error ? error : new Error(String(error));
    logger.apiError("/api/code", errorInstance, userId);
    
    const message = parseError(error);
    const status = message.includes("Unauthorized") || message.includes("auth") ? 401 : 500;
    
    return new Response(message, { status });
  }
};
