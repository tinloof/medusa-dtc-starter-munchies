import { notFound } from "next/navigation";
import type { ResolvingMetadata } from "next/types";
import { loadFaqs } from "@/data/sanity";
import { resolveSanityRouteMetadata } from "@/data/sanity/resolve-sanity-route-metadata";

import Faq from "./_parts/faq-page";
export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
  const { data } = await loadFaqs();

  if (!data) {
    return notFound();
  }

  return resolveSanityRouteMetadata(
    {
      indexable: data.indexable,
      pathname: data.pathname,
      seo: data?.seo,
    },
    parent
  );
}
export default async function FaqPage() {
  const { data } = await loadFaqs();
  if (!data) {
    return notFound();
  }

  return <Faq data={data} />;
}
