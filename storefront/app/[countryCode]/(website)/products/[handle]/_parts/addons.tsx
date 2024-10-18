import type {Product} from "@/types/sanity.generated";

import {AddonsItem} from "@/components/shared/addons-item";
import Heading from "@/components/shared/typography/heading";
import {getProductsByIds} from "@/data/medusa/products";

export default async function Addons({
  products: productRefs,
  region_id,
  title,
}: {
  region_id: string;
} & Product["addons"]) {
  const ids = productRefs?.map(({_ref}) => _ref);

  if (!ids || ids.length === 0) return null;

  const {products} = await getProductsByIds(ids, region_id);

  return (
    <div className="flex flex-col gap-xs rounded-lg bg-secondary p-s">
      <Heading desktopSize="lg" mobileSize="base" tag={"h4"}>
        {title}
      </Heading>
      {products.map((product) => (
        <AddonsItem key={product.id} region_id={region_id} {...product} />
      ))}
    </div>
  );
}
