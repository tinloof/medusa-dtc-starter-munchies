import {createClient} from "next-sanity";

import {apiVersion, dataset, projectId} from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
