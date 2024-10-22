import type {PageProps} from "@/types";
import type {TEXT_PAGE_QUERYResult} from "@/types/sanity.generated";
import type {ResolvingMetadata} from "next";

import SectionsRenderer from "@/components/sections/section-renderer";
import {loadPageByPathname} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolve-sanity-route-metadata";
import {notFound} from "next/navigation";

import TextPage from "./text-page.template";

export type DynamicRouteProps = PageProps<"...path" | "countryCode">;

export async function generateMetadata(props: DynamicRouteProps, parent: ResolvingMetadata) {
  const params = await props.params;
  const initialData = await loadPageByPathname({params});

  if (!initialData) {
    return notFound();
  }

  if (
    initialData._type === "modular.page" ||
    initialData._type === "home" ||
    initialData._type === "text.page"
  ) {
    return resolveSanityRouteMetadata(initialData, parent);
  }

  return {};
}

export default async function DynamicRoute(props: DynamicRouteProps) {
  const params = await props.params;
  const initialData = await loadPageByPathname({params});
  if (!initialData) return notFound();

  switch (initialData._type) {
    case "modular.page":
    case "home":
      return (
        <SectionsRenderer
          countryCode={params.countryCode}
          {...{fieldName: "body", sections: initialData.sections || []}}
        />
      );
    case "text.page":
      return (
        <TextPage data={initialData as NonNullable<TEXT_PAGE_QUERYResult>} />
      );
    default:
      return <div>Template not found</div>;
  }
}
