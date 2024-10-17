import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Link from "next/link";

export default function BreadCrumbs({
  collection,
  title,
}: Pick<StoreProduct, "collection" | "title">) {
  return (
    <Body className="-mb-1" desktopSize="base" font="sans" mobileSize="sm">
      <Link href="/">Home</Link>{" "}
      {collection && (
        <>
          {" / "}
          <Link href={`/collections/${collection.handle}`}>
            {collection.title}
          </Link>{" "}
        </>
      )}
      {" / "}
      {title}
    </Body>
  );
}
