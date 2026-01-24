/**
 * Parses an unknown error into a user-friendly message.
 * Handles various error types including database errors.
 */
export const parseError = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    // Handle PostgreSQL/Drizzle specific errors
    const message = error.message;

    // Check for common database errors
    if (message.includes("duplicate key")) {
      return "This item already exists";
    }

    if (message.includes("foreign key")) {
      return "Referenced item not found";
    }

    if (message.includes("connection")) {
      return "Database connection error. Please try again.";
    }

    if (message.includes("timeout")) {
      return "Request timed out. Please try again.";
    }

    // Don't expose internal error details in production
    if (process.env.NODE_ENV === "production") {
      // Log the full error for debugging
      console.error("[Error]", error);
      
      // Return a sanitized message
      if (message.includes("ECONNREFUSED") || message.includes("ENOTFOUND")) {
        return "Service temporarily unavailable";
      }
    }

    return message;
  }

  // Handle objects with message property
  if (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "An unexpected error occurred";
};
