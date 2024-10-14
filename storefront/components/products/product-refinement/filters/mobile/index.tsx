"use client";
import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import {usePathname, useRouter} from "next/navigation";
import {type PropsWithChildren, useCallback, useState} from "react";

import DropDown from "../drop-down";

type Props = PropsWithChildren;

export default function MobileFilterDropdown({children}: Props) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const clearSearchParams = useCallback(() => {
    router.push(pathname);
    setOpen(false);
  }, [router, pathname]);

  return (
    <DropDown isOpen={isOpen} placeholder="Filter" setOpen={setOpen}>
      {children}
      <div className="my-2 flex w-[calc(100vw-40px)] flex-col justify-center gap-s px-xs">
        <Cta className="w-full" onClick={() => setOpen(false)} size="md">
          Show Results
        </Cta>
        <button onClick={() => clearSearchParams()}>
          <Body className="underline" font="sans" mobileSize="sm">
            Clear all
          </Body>
        </button>
      </div>
    </DropDown>
  );
}

export function useClearSearchParams() {}
