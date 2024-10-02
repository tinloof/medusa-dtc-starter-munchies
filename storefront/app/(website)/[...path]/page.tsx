import type {PageProps} from "@/types";
import type {BLOG_POST_QUERYResult} from "@/types/sanity.generated";
import type {ResolvingMetadata} from "next";

import {BlogPost} from "@/components/templates/blog/BlogPost";
import {Page} from "@/components/templates/page/Page";
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
    case "blog.post":
      return <BlogPost data={initialData as BLOG_POST_QUERYResult} />;
    default:
      return <div>Template not found</div>;
  }
}
