import type {StoreProduct} from "@medusajs/types";

import LocalizedLink from "@/components/shared/localized-link";
import Body from "@/components/shared/typography/body";

export default function BreadCrumbs({
  collection,
  title,
}: Pick<StoreProduct, "collection" | "title">) {
  return (
    <Body className="-mb-1" desktopSize="base" font="sans" mobileSize="sm">
      <LocalizedLink href="/">Home</LocalizedLink>{" "}
      {collection && (
        <>
          {" / "}
          <LocalizedLink href={`/products?collection=${collection.id}`}>
            {collection.title}
          </LocalizedLink>{" "}
        </>
      )}
      {" / "}
      {title}
    </Body>
  );
}
