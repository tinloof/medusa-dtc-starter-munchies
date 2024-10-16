"use client";
import Select from "@/components/shared/select";
import {useQueryState} from "nuqs";

export type SortOptions = "created_at" | "price_asc" | "price_desc";

export default function Sort() {
  const [orderBy, setOrderBy] = useQueryState("sort", {
    defaultValue: "created_at",
    shallow: false,
  });

  const options = [
    {
      label: "Descending Order",
      value: "created_at",
    },
    {
      label: "Ascending Order",
      value: "-created_at",
    },
  ];

  const setOption = (value: string) => setOrderBy(value);

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
