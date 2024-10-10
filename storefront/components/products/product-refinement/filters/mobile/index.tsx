"use client";
import {Cta} from "@/components/shared/button";
import {type PropsWithChildren, useState} from "react";

import DropDown from "../drop-down";

type Props = PropsWithChildren;

export default function MobileFilterDropdown({children}: Props) {
  const [isOpen, setOpen] = useState(false);
  return (
    <DropDown isOpen={isOpen} placeholder="Filter" setOpen={setOpen}>
      {children}
      <div className="flex w-full justify-center px-2">
        <Cta className="my-2 w-full" onClick={() => setOpen(false)} size="md">
          Show Results
        </Cta>
      </div>
    </DropDown>
  );
}
