import {
  PUBLIC_MEDUSA_BACKEND_URL,
  PUBLIC_MEDUSA_PUBLISHABLE_KEY,
} from "astro:env/server";

import Medusa from "@medusajs/js-sdk";

const medusa = new Medusa({
  baseUrl: PUBLIC_MEDUSA_BACKEND_URL ?? "",
  publishableKey: PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

export default medusa;
