import type {Collection} from "@/types/sanity.generated";
import type {StoreCollection} from "@medusajs/types";

import medusa from "./client";

export async function getCollectionByHandle(handle: string) {
  return medusa.store.collection
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
}
