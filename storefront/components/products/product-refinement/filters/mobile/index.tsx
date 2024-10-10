"use client";
import {Cta} from "@/components/shared/button";
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
      <div className="my-2 flex w-full flex-col justify-center gap-4 px-2">
        <Cta className="w-full" onClick={() => setOpen(false)} size="md">
          Show Results
        </Cta>
        <button
          className="text-center font-sans text-sm font-medium text-accent underline"
          onClick={() => clearSearchParams()}
        >
          Clear all
        </button>
      </div>
    </DropDown>
  );
}

export function useClearSearchParams() {}
