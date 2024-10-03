import type {PageProps} from "@/types";
import type {ResolvingMetadata} from "next";

import {Page} from "@/components/templates/page/page";
import {loadHome} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolveSanityRouteMetadata";
import {notFound} from "next/navigation";

export async function generateMetadata(
  props: PageProps,
  parent: ResolvingMetadata,
) {
  const initialData = await loadHome();

  if (!initialData) {
    return notFound();
  }

  return resolveSanityRouteMetadata(
    {
      indexable: initialData.indexable,
      pathname: initialData.pathname,
      seo: initialData?.seo,
    },
    parent,
  );
}

export default async function IndexRoute() {
  const data = await loadHome();

  return <Page data={data} />;
}
