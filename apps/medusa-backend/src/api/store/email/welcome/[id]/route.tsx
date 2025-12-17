import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import Welcome from "../../_templates/welcome";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  const customerService = req.scope.resolve(Modules.CUSTOMER);
  const productService = req.scope.resolve(Modules.PRODUCT);

  const customer = await customerService.retrieveCustomer(id);
  const products = await productService.listProducts({}, { take: 2 });

  try {
    await sendEmail({
      to: customer.email,
      subject: "Welcome to our newsletter!",
      react: <Welcome products={products} />,
    });

    res.json({ message: "Email sent!" });
  } catch (e) {
    res.json({ message: "Email failed" });
  }
}
