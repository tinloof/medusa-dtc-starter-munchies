"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Link } from "@/components/shared/button";
import Body from "@/components/shared/typography/body";

export default function ClearAllButton({
  variant,
}: {
  variant: "button" | "underline";
}) {
  const router = useRouter();
  const pathname = usePathname();

  const clearSearchParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return (
    <>
      {variant === "underline" ? (
        <button onClick={clearSearchParams} type="button">
          <Body className="underline" font="sans" mobileSize="sm">
            Clear all
          </Body>
        </button>
      ) : (
        <Link
          className="mt-3"
          href="/products"
          onClick={clearSearchParams}
          size="sm"
          variant="outline"
        >
          Clear filters
        </Link>
      )}
    </>
  );
}
