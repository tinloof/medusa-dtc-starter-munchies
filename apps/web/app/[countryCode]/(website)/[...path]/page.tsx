import type { TEXT_PAGE_QUERYResult } from "@packages/sanity/types";
import type { ResolvedMetadata } from "next";
import { notFound } from "next/navigation";

import SectionsRenderer from "@/components/sections/section-renderer";
import { loadPageByPathname } from "@/data/sanity";

import { resolveSanityMetadata } from "@/data/sanity/client";
import TextPage from "./text-page.template";

export type DynamicRouteProps = PageProps<"/[countryCode]/[...path]">;

export async function generateMetadata(
  props: DynamicRouteProps,
  parentPromise: Promise<ResolvedMetadata>
) {
  const parent = await parentPromise;
  const params = await props.params;
  const result = await loadPageByPathname({ params });

  const data = result?.data;

  if (!data) {
    return notFound();
  }

  if (
    data._type === "modular.page" ||
    data._type === "home" ||
    data._type === "text.page"
  ) {
    return resolveSanityMetadata({
      parent,
      title: data.title,
      seo: data.seo,
      pathname: data.pathname,
    });
  }

  return {};
}

export default async function DynamicRoute(props: DynamicRouteProps) {
  const params = await props.params;
  const result = await loadPageByPathname({ params });
  const data = result?.data;

  if (!data) {
    return notFound();
  }

  switch (data._type) {
    case "modular.page":
    case "home":
      return (
        <SectionsRenderer
          countryCode={params.countryCode}
          {...{ fieldName: "body", sections: data.sections || [] }}
        />
      );
    case "text.page":
      return <TextPage data={data as NonNullable<TEXT_PAGE_QUERYResult>} />;
    default:
      return <div>Template not found</div>;
  }
}
