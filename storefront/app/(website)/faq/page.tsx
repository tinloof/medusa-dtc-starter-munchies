import type {ResolvingMetadata} from "next/types";

import {loadFaq} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolve-sanity-route-metadata";
import {notFound} from "next/navigation";

import Faq from "./_parts/faq-page";
type IndexRouteProps = {
  params: {locale: string};
};
export async function generateMetadata(
  props: IndexRouteProps,
  parent: ResolvingMetadata,
) {
  const initialData = await loadFaq();

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
export default async function FaqPage() {
  const data = await loadFaq();
  if (!data) return notFound;

  return <Faq data={data} />;
}
