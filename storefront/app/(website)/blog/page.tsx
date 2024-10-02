import type {PageProps} from "@/types";
import type {ResolvingMetadata} from "next";

import {BlogIndex} from "@/components/templates/blog/BlogIndex";
import {loadBlogIndex} from "@/data/sanity";
import {resolveSanityRouteMetadata} from "@/data/sanity/resolveSanityRouteMetadata";
import {notFound} from "next/navigation";

type BlogRouteProps = PageProps<"tag", "page">;

export async function generateMetadata(
  props: BlogRouteProps,
  parent: ResolvingMetadata,
) {
  const initialData = await loadBlogIndex({});

  if (!initialData) {
    return notFound();
  }

  if (initialData._type === "blogIndex") {
    return resolveSanityRouteMetadata(initialData, parent);
  }

  return {};
}

export default async function BlogIndexRoute(props: BlogRouteProps) {
  const searchParams = props.searchParams;
  const pageNumber = searchParams?.page ? Number(searchParams?.page) : 1;
  const tag = props.params.tag;

  const data = await loadBlogIndex({
    entriesPerPage: 3,
    infiniteLoading: true,
    pageNumber,
    tag,
  });

  return <BlogIndex data={data} tagParam={tag} />;
}
