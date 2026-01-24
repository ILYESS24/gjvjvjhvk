import { z } from "zod";

/**
 * Validation schemas for API inputs
 */

// Chat API schema
export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(100000), // Max 100k chars per message
    })
  ).min(1).max(100), // Max 100 messages
  modelId: z.string().min(1).max(100),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Code API schema
export const codeRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(100000),
    })
  ).min(1).max(100),
  modelId: z.string().min(1).max(100),
  language: z.string().min(1).max(50).optional(),
});

export type CodeRequest = z.infer<typeof codeRequestSchema>;

/**
 * Validate request body against a schema
 * Returns the parsed data or throws a validation error
 */
export async function validateRequest<T>(
  req: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      const errors = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return { success: false, error: `Validation failed: ${errors}` };
    }
    
    return { success: true, data: result.data };
  } catch {
    return { success: false, error: "Invalid JSON body" };
  }
}
