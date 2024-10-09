"use client";
import Select from "@/components/shared/select";
import {useQueryState} from "nuqs";
import {type ComponentProps, useState} from "react";

export default function FilterSelect(
  props: {name: string; placeholder: string} & Omit<
    ComponentProps<typeof Select>,
    "setOption" | "variant"
  >,
) {
  const [filter, setFilter] = useQueryState(props.name, {defaultValue: "all"});
  const [key, setKey] = useState(0);

  const setOption = (value: string) => {
    if (value === "all") {
      setKey((prev) => prev + 1);
      setFilter(null, {shallow: true});
    } else {
      setFilter(value, {shallow: true});
    }
  };

  const options = [{label: props.placeholder, value: "all"}, ...props.options];

  return (
    <Select
      key={key}
      options={options}
      placeholder={props.placeholder}
      setOption={setOption}
      value={filter}
      variant="filter"
    />
  );
}
