import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export async function GET(
	_req: MedusaRequest,
	res: MedusaResponse,
): Promise<void> {
	res.sendStatus(200);
}
