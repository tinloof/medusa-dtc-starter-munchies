import type {ValidationContext} from "sanity";

// Note: this assumes that every document that has a slug field
// have it on the `slug` field at the root
export async function isUnique(slug: string, context: ValidationContext) {
  const {document, getClient} = context;
  const client = getClient({apiVersion: "2023-06-21"});
  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `*[!(_id in [$draft, $published]) && pathname.current == $slug]`;
  const result = await client.fetch(query, params);

  return result.length === 0;
}
