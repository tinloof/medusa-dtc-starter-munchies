import type {PRODUCT_QUERYResult} from "@/types/sanity.generated";
import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import {ProductVariantsProvider} from "../product-context";
import AddToCart from "./add-to-cart";
import Addons from "./addons";
import BreadCrumbs from "./breadcrumbs";
import OptionsSelect from "./options";
import Price from "./price";
import ProductSpecs from "./specs";

type Props = {
  content: PRODUCT_QUERYResult;
  region_id: string;
} & StoreProduct;

export default function ProductInformation(props: Props) {
  return (
    <ProductVariantsProvider product={props}>
      <div className="lg:y-s flex w-full flex-col gap-lg px-m pb-2xl pt-s lg:max-w-[580px]">
        <BreadCrumbs collection={props.collection} title={props.title} />
        <Heading
          className="leading-[100%]"
          desktopSize="5xl"
          mobileSize="2xl"
          tag="h1"
        >
          {props.title}
        </Heading>
        <Price product={{id: props.id, variants: props.variants}} />
        <Body
          className="font-normal"
          desktopSize="lg"
          font="sans"
          mobileSize="base"
        >
          {props.description}
        </Body>
        <div className="mt-s flex flex-col gap-s">
          {props.options && <OptionsSelect options={props.options} />}
          <AddToCart region_id={props.region_id} variant="PDP" />
        </div>
        <Addons
          products={props.content?.addons?.products}
          region_id={props.region_id}
          title={props.content?.addons?.title}
        />
        <ProductSpecs specs={props.content?.specs} />
      </div>
    </ProductVariantsProvider>
  );
}

// import type {HttpTypes} from "@medusajs/types";

// import {getProductPrice} from "@/lib/util/get-product-price";
// import {Badge, clx} from "@medusajs/ui";

// export default function ProductPrice({
//   product,
//   variant,
// }: {
//   product: HttpTypes.StoreProduct;
//   variant?: HttpTypes.StoreProductVariant;
// }) {
//   const {cheapestPrice, variantPrice} = getProductPrice({
//     product,
//     variantId: variant?.id,
//   });

//   const selectedPrice = variant ? variantPrice : cheapestPrice;

//   if (!selectedPrice) {
//     return <div className="block h-9 w-32 animate-pulse bg-gray-100" />;
//   }

//   return (
//     <div className="text-ui-fg-base flex flex-row items-center gap-2">
//       <span
//         className={clx("text-2xl font-semibold", {
//           "text-destructive": selectedPrice.price_type === "sale",
//         })}
//       >
//         {!variant && "À partir de "}
//         <span
//           data-testid="product-price"
//           data-value={selectedPrice.calculated_price_number}
//         >
//           {selectedPrice.calculated_price}
//         </span>
//       </span>
//       {selectedPrice.price_type === "sale" && (
//         <>
//           <p
//             className="text-muted-foreground line-through"
//             data-testid="original-product-price"
//             data-value={selectedPrice.original_price_number}
//           >
//             {selectedPrice.original_price}
//           </p>
//           <Badge>-{selectedPrice.percentage_diff}%</Badge>
//         </>
//       )}
//     </div>
//   );
// }
