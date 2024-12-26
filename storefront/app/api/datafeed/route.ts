import medusa from "@/data/medusa/client";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    // Get all products (first page, adjust region_id as needed)
    // const { products } = await getProducts(1, "reg_01", {});
    const {products} = await medusa.store.product.list({
      fields: "+images.*,+variants.*,*variants.calculated_price",
    });

    // CSV header
    const headers = [
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "price",
      "link",
      "image_link",
      "brand",
      "google_product_category",
      "fb_product_category",
      "quantity_to_sell_on_facebook",
      "sale_price",
      "sale_price_effective_date",
      "item_group_id",
      "gender",
      "color",
      "size",
      "age_group",
      "material",
      "pattern",
      "shipping",
      "shipping_weight",
      "gtin",
    ].join(",");

    // Map products to CSV rows
    const rows = products.map((product) => {
      const variant = product.variants?.[0]; // Get first variant for price
      const image = product.images?.[0]; // Get first image

      return [
        product.id,
        `"${product.title.replace(/"/g, '""')}"`, // Escape quotes in title
        `"${product.description?.replace(/"/g, '""') || ""}"`,
        "in stock",
        "new",
        `"PKR ${variant?.calculated_price?.calculated_amount || ""}"`,
        `https://muattar-store.vercel.app/products/${product.handle}`, // Update with your domain
        image?.url || "",
        "crochet", // or product.brand
        "", // google_product_category
        "", // fb_product_category
        "", // quantity_to_sell_on_facebook
        "", // sale_price
        "", // sale_price_effective_date
        product.handle, // item_group_id
        "", // gender
        "", // color
        variant?.title || "", // size
        "kids", // age_group
        "yarn", // material
        "", // pattern
        "PK:CA:Ground:200 PKR", // shipping
        "", // shipping_weight
        "", // gtin
      ].join(",");
    });

    // Combine header and rows
    const csv = [headers, ...rows].join("\n");

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        "Content-Disposition": "attachment; filename=datafeed.csv",
        "Content-Type": "text/csv",
      },
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json({error: "Failed to generate CSV"}, {status: 500});
  }
}
