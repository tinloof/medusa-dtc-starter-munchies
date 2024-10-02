import type {BLOG_INDEX_QUERYResult} from "@/types/sanity.generated";

import {SanityImage} from "@/components/SanityImage";
import {cx} from "cva";
import Link from "next/link";

import {LoadMoreButton} from "./LoadMoreButton";

export function BlogIndex({
  data,
  tagParam,
}: {
  data: BLOG_INDEX_QUERYResult;
  tagParam?: string;
}) {
  const pagesTotal = Math.ceil(
    (data?.entriesCount as number) / (data?.entriesPerPage as number),
  );
  const hasNextPage = pagesTotal > (data?.pageNum as number);

  return (
    <div className="container py-20">
      <h1 className="text-center">{data?.title}</h1>
      <div className="mt-8 flex items-center justify-center">
        {data?.blogTags.map((tag) => (
          <Link
            className={cx([
              "inline-flex rounded-full border px-2 py-1 text-sm",
              tagParam === tag.slug?.current && "bg-gray-200",
            ])}
            href={`/blog/tag/${tag.slug?.current}`}
            key={tag._id}
          >
            {tag.title}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-3 lg:grid-cols-3">
        {data?.entries?.map(
          (post) =>
            post.pathname?.current && (
              <Link href={post.pathname.current} key={post._id}>
                <div className="overflow-hidden rounded border">
                  <SanityImage
                    aspectRatio="1/1"
                    data={post.featuredImage}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="p-4">{post.title}</div>
                </div>
              </Link>
            ),
        )}
      </div>
      {hasNextPage && (
        <div className="mt-10 flex justify-center">
          <LoadMoreButton pageNumber={data?.pageNum as number} />
        </div>
      )}
    </div>
  );
}
