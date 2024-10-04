import medusa from "./client";

export async function getCategoryByHandle(handle: string[]) {
  return medusa.store.category
    .list(
      {
        // @ts-expect-error Type error
        handle: handle[handle.length - 1],
      },
      {next: {tags: ["category"]}},
    )
    .then(({product_categories}) => product_categories[0]);
}
