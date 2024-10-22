import {unstable_cache} from "next/cache";

import medusa from "./client";

export const getCollectionByHandle = unstable_cache(
  async function (handle: string, page: number) {
    const limit = 12;
    const offset = (page - 1) * limit;

    const collection = await medusa.store.collection
      .list(
        {
          handle,
        },
        {next: {tags: ["collections"]}},
      )
      .then(({collections}) => collections[0]);

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
  },
  ["collection"],
  {
    revalidate: 120,
  },
);

export const getCollections = unstable_cache(
  async function () {
    return await medusa.store.collection.list(
      {fields: "id,title"},
      {next: {tags: ["collections"]}},
    );
  },
  ["collections"],
  {
    revalidate: 120,
  },
);
