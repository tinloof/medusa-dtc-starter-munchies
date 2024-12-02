"use client";

import {Link} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import {usePathname, useRouter} from "next/navigation";
import {Fragment, useCallback} from "react";

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
    <Fragment>
      {variant === "underline" ? (
        <button onClick={clearSearchParams}>
          <Body className="underline" font="sans" mobileSize="sm">
            Tout effacer
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
          Réinitialiser les filtres
        </Link>
      )}
    </Fragment>
  );
}
