"use client";
import Select from "@/components/shared/select";
import {useQueryState} from "nuqs";

export type SortOptions = "created_at" | "price_asc" | "price_desc";

export default function Sort() {
  const [orderBy, setOrderBy] = useQueryState("sort", {
    defaultValue: "created_at",
  });

  const options = [
    {
      label: "Descending Order (Newest First)",
      value: "created_at",
    },
    {
      label: "Ascending Order (Oldest First)",
      value: "-created_at",
    },
  ];

  const setOption = (value: string) => setOrderBy(value, {shallow: false});

  const placeholder = options.find(({value}) => value === orderBy)?.label;

  return (
    <Select
      options={options}
      placeholder={placeholder}
      setOption={setOption}
      value={orderBy}
      variant="basic"
    />
  );
}
