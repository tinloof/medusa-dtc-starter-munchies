"use client";

import type {StoreProductOption} from "@medusajs/types";

import Select from "@/components/shared/select";
import {useState} from "react";

type Props = {
  options: StoreProductOption[];
};

export default function OptionsSelect({options}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | undefined>
  >(() => {
    return (options || []).reduce(
      (optionObj, option) => {
        optionObj[option.id] = undefined;
        return optionObj;
      },
      {} as Record<string, string | undefined>,
    );
  });

  return options?.map((option) => {
    const values = option.values?.map(({id, value}) => ({
      label: value,
      value: id,
    }));

    console.log(values);

    if (!values || values?.length === 0) return null;

    return <Select key={option.id} options={values} />;
  });
}
