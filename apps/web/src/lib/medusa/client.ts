import { MEDUSA_BACKEND_URL, MEDUSA_PUBLISHABLE_KEY } from "astro:env/server";

import Medusa from "@medusajs/js-sdk";

const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL ?? "",
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
});

export default medusa;
