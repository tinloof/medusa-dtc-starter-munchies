import type { HttpTypes } from "@medusajs/types";
import { AddonsItem } from "@/components/shared/addons-item";
import { Heading } from "@/components/shared/typography/heading";

export default function Addons({
  products,
  title,
}: {
  products: HttpTypes.StoreProduct[];
  title?: string;
}) {
  if (products.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-xs rounded-lg bg-secondary p-s">
      <Heading desktopSize="lg" mobileSize="base" tag={"h4"}>
        {title}
      </Heading>
      {products.map((product) => (
        <AddonsItem key={product.id} {...product} />
      ))}
    </div>
  );
}
