import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// biome-ignore lint/performance/noNamespaceImport: Required for drizzle-orm schema
import * as schema from "@/schema";
import { env } from "./env";

declare global {
  var postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

let database: ReturnType<typeof drizzle<typeof schema>>;

let client: ReturnType<typeof postgres>;

// Connection pool configuration for production
const connectionConfig = {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  prepare: false,
  // Connection pool settings for better performance
  max: process.env.NODE_ENV === "production" ? 10 : 3,
  idle_timeout: 20,
  connect_timeout: 10,
  // Enable SSL in production
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
} as const;

if (process.env.NODE_ENV !== "production") {
  // In development, use a global variable to preserve the connection across hot reloads
  if (!global.postgresSqlClient) {
    global.postgresSqlClient = postgres(env.POSTGRES_URL, connectionConfig);
  }
  client = global.postgresSqlClient;
} else {
  // In production, create a new connection pool
  client = postgres(env.POSTGRES_URL, connectionConfig);
}

database = drizzle({ client, schema });

export { database };
