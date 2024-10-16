"use client";

import DropDown from "./filters/drop-down";

export default function EmptyDropdown({placeholder}: {placeholder: string}) {
  return (
    <DropDown isOpen={false} placeholder={placeholder} setOpen={() => {}} />
  );
}
