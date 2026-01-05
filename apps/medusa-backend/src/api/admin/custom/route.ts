import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export function GET(_req: MedusaRequest, res: MedusaResponse) {
  res.sendStatus(200);
}
