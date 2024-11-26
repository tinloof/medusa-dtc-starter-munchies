// import { loadEnv } from "@medusajs/framework/utils";
import Medusa from "@medusajs/js-sdk";
// loadEnv(process.env.NODE_ENV, process.cwd());

export const backendUrl = "https://admin.lakikabio.coolify.fmouss.dev";
//"http://localhost:9000";

export const sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: "session",
  },
});

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  (window as any).__sdk = sdk;
}
