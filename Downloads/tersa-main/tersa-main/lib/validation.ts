import { z } from "zod";

/**
 * Validation schemas for API inputs
 */

// Message part schema (flexible to support various message formats)
const messagePartSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
}).passthrough();

// Message schema (flexible to support UIMessage format)
const messageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().optional(),
  parts: z.array(messagePartSchema).optional(),
}).passthrough();

// Chat API schema
export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(100), // Max 100 messages
  modelId: z.string().min(1).max(100),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Code API schema
export const codeRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(100),
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
      const errors = result.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return { success: false, error: `Validation failed: ${errors}` };
    }
    
    return { success: true, data: result.data };
  } catch {
    return { success: false, error: "Invalid JSON body" };
  }
}
