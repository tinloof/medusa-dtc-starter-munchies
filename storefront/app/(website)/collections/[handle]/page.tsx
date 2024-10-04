import type {PageProps} from "@/types";

import {getCollectionByHandle} from "@/data/medusa/collections";
import {notFound} from "next/navigation";

type CollectionPageProps = PageProps<"handle">;

export default async function CollectionPage({params}: CollectionPageProps) {
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    console.log("No collection found");
    return notFound();
  }

  return collection.title;
}
