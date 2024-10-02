import type {BLOG_POST_QUERYResult} from "@/types/sanity.generated";

import {BlogRichText} from "@/components/RichText";
import {SanityImage} from "@/components/SanityImage";

export function BlogPost({data}: {data: BLOG_POST_QUERYResult}) {
  return (
    <>
      <div className="relative h-[450px]">
        <div>
          {data?.featuredImage && (
            <SanityImage
              className="absolute inset-0 object-cover"
              data={data?.featuredImage}
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 size-full bg-black opacity-30"></div>
        </div>
        <div className="flex size-full items-center justify-center">
          <h1 className="relative text-center text-3xl font-semibold text-white">
            {data?.title}
          </h1>
        </div>
      </div>
      <div className="container py-20">
        <div className="mx-auto mt-10 max-w-prose">
          {data?.body && <BlogRichText value={data.body} />}
        </div>
      </div>
    </>
  );
}
