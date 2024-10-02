"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

export function LoadMoreButton(props: {pageNumber: number}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());
  const pageNumber = props.pageNumber + 1;
  params.set("page", pageNumber.toString());

  return (
    <Link
      className="inline-flex rounded border px-3 py-2"
      href={`${pathname}?${params}`}
      replace
      scroll={false}
    >
      Load more
    </Link>
  );
}
