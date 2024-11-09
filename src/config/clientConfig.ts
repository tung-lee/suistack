import { z } from "zod";

/*
 * The schema for the client-side environment variables
 * These variables should be defined in the app/.env file
 * These variables are NOT SECRET, they are exposed to the client side
 * They can and should be tracked by Git
 * All of the env variables must have the VITE_PUBLIC_ prefix
 */

const clientConfigSchema = z.object({
  SUI_NETWORK: z.string(),
  SUI_NETWORK_NAME: z.enum(["mainnet", "testnet", "devnet"]),
  ENOKI_API_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  PACKAGE_ID: z.string(),
  GLOBAL_COUNTER_ID: z.string(),
});

const clientConfig = clientConfigSchema.parse({
  SUI_NETWORK: import.meta.env.VITE_PUBLIC_SUI_NETWORK,
  SUI_NETWORK_NAME: import.meta.env.VITE_PUBLIC_SUI_NETWORK_NAME as
    | "mainnet"
    | "testnet"
    | "devnet",
  ENOKI_API_KEY: import.meta.env.VITE_PUBLIC_ENOKI_API_KEY,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
  PACKAGE_ID: import.meta.env.VITE_PUBLIC_PACKAGE_ID,
  GLOBAL_COUNTER_ID: import.meta.env.VITE_PUBLIC_GLOBAL_COUNTER_ID,
});

export default clientConfig;
