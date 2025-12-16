import type {ResolvingMetadata} from "next/types";

import {loadFaqs} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolve-sanity-route-metadata";
import {notFound} from "next/navigation";

import Faq from "./_parts/faq-page";
export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
  const initialData = await loadFaqs();

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
  const data = await loadFaqs();
  if (!data) return notFound();

  return <Faq data={data} />;
}
