import {loadCookieBanner} from "@/data/sanity";

import Content from "./content";

export default async function CookieBanner() {
  const data = await loadCookieBanner();

  return <Content data={data} />;
}
