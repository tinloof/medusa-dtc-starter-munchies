import { notFound } from "next/navigation";
import type { ResolvedMetadata } from "next/types";
import { loadFaqs } from "@/data/sanity";
import { resolveSanityMetadata } from "@/data/sanity/client";
import Faq from "./_parts/faq-page";
export async function generateMetadata(
  _: unknown,
  parentPromise: Promise<ResolvedMetadata>
) {
  const parent = await parentPromise;
  const { data } = await loadFaqs();

  if (!data) {
    return notFound();
  }

  return resolveSanityMetadata({
    parent,
    title: data.title,
    seo: data.seo,
    pathname: data.pathname,
  });
}
export default async function FaqPage() {
  const { data } = await loadFaqs();
  if (!data) {
    return notFound();
  }

  return <Faq data={data} />;
}
