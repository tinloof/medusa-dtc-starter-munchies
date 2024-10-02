import type {ResolvingMetadata} from "next";

import {Page} from "@/components/templates/page/Page";
import {loadHome} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolveSanityRouteMetadata";
import {notFound} from "next/navigation";

export type DefaultRouteProps = {
  searchParams: {[key: string]: string | string[] | undefined};
};

type IndexRouteProps = DefaultRouteProps;

export async function generateMetadata(
  props: IndexRouteProps,
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
