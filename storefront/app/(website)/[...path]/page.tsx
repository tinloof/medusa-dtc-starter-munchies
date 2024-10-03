import type {PageProps} from "@/types";
import type {ResolvingMetadata} from "next";

import {Page} from "@/components/templates/page/page";
import {loadPageByPathname} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolveSanityRouteMetadata";
import {notFound} from "next/navigation";

export type DynamicRouteProps = PageProps<"...path">;

export async function generateMetadata(
  {params}: DynamicRouteProps,
  parent: ResolvingMetadata,
) {
  const initialData = await loadPageByPathname({params});

  if (!initialData) {
    return notFound();
  }

  if (
    initialData._type === "modular.page" ||
    initialData._type === "blog.post"
  ) {
    return resolveSanityRouteMetadata(initialData, parent);
  }

  return {};
}

export default async function DynamicRoute({params}: DynamicRouteProps) {
  const initialData = await loadPageByPathname({params});

  if (!initialData) return notFound();

  switch (initialData._type) {
    case "modular.page":
      return <Page data={initialData} />;
    default:
      return <div>Template not found</div>;
  }
}
