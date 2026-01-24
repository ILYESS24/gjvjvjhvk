/**
 * Production-ready structured logger
 * Outputs JSON in production for log aggregation services
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const isProduction = process.env.NODE_ENV === "production";

function formatLog(entry: LogEntry): string {
  if (isProduction) {
    // JSON format for production (easier to parse by log aggregators)
    return JSON.stringify(entry);
  }
  
  // Pretty format for development
  const { timestamp, level, message, context, error } = entry;
  const levelColors: Record<LogLevel, string> = {
    debug: "\x1b[36m", // cyan
    info: "\x1b[32m",  // green
    warn: "\x1b[33m",  // yellow
    error: "\x1b[31m", // red
  };
  const reset = "\x1b[0m";
  const color = levelColors[level];
  
  let output = `${color}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}`;
  
  if (context && Object.keys(context).length > 0) {
    output += ` ${JSON.stringify(context)}`;
  }
  
  if (error) {
    output += `\n  Error: ${error.name}: ${error.message}`;
    if (error.stack && !isProduction) {
      output += `\n  Stack: ${error.stack}`;
    }
  }
  
  return output;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: Error
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };
  
  if (context && Object.keys(context).length > 0) {
    entry.context = context;
  }
  
  if (error) {
    entry.error = {
      name: error.name,
      message: error.message,
      // Only include stack in non-production or for error level
      stack: !isProduction || level === "error" ? error.stack : undefined,
    };
  }
  
  return entry;
}

function log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
  const entry = createLogEntry(level, message, context, error);
  const formatted = formatLog(entry);
  
  switch (level) {
    case "debug":
      if (!isProduction) console.debug(formatted);
      break;
    case "info":
      console.info(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "error":
      console.error(formatted);
      break;
  }
}

export const logger = {
  debug: (message: string, context?: LogContext) => log("debug", message, context),
  info: (message: string, context?: LogContext) => log("info", message, context),
  warn: (message: string, context?: LogContext) => log("warn", message, context),
  error: (message: string, error?: Error, context?: LogContext) => 
    log("error", message, context, error),
  
  /**
   * Log an API request
   */
  apiRequest: (route: string, method: string, userId?: string, context?: LogContext) => {
    log("info", `API Request: ${method} ${route}`, { userId, ...context });
  },
  
  /**
   * Log an API error
   */
  apiError: (route: string, error: Error, userId?: string, context?: LogContext) => {
    log("error", `API Error: ${route}`, { userId, ...context }, error);
  },
};
