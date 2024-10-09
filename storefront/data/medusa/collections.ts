import type {Collection} from "@/types/sanity.generated";
import type {StoreCollection} from "@medusajs/types";

import medusa from "./client";

export async function getCollectionByHandle(handle: string, page: number) {
  const limit = 12;
  const offset = (page - 1) * limit;

  const collection = await medusa.store.collection
    .list(
      {
        fields: "+sanity_collection.*",
        handle,
      },
      {next: {tags: ["collections"]}},
    )
    .then(
      ({collections}) =>
        collections[0] as {sanity_collection: Collection} & StoreCollection,
    );

  const {count, products} = await medusa.store.product.list(
    {
      collection_id: collection.id,
      fields: "+images.*,+variants.*",
      limit,
      offset,
    },
    {next: {tags: ["products"]}},
  );

  return {
    collection,
    hasNextPage: count > offset + limit,
    products,
  };
}

export async function getCollections() {
  return await medusa.store.collection.list(
    {fields: "id,title"},
    {next: {tags: ["collections"]}},
  );
}
