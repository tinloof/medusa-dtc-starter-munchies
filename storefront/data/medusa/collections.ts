
import medusa from "./client";

export async function getCollectionByHandle(handle: string) {
  return medusa.store.collection
    .list(
      {
        handle,
      },
      {next: {tags: ["collections"]}},
    )
    .then(
      ({collections}) =>
        collections[0]
    );
}
