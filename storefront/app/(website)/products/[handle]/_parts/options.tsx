"use client";

import type {StoreProductOption} from "@medusajs/types";

import Select from "@/components/shared/select";

import {useProductVariants} from "../product-context";

type Props = {
  options: StoreProductOption[];
};

export default function OptionsSelect({options}: Props) {
  const {setSelectedOptions} = useProductVariants();

  return options?.map((option) => {
    const values = option.values?.map(({value}) => ({
      label: value,
      value: value.toLowerCase(),
    }));

    if (!values || values?.length === 0) return null;

    const setOption = (value: string) =>
      setSelectedOptions((prev) => ({
        ...prev,
        [option.title.toLowerCase()]: value,
      }));

    return (
      <Select
        key={option.id}
        options={values}
        setOption={setOption}
        variant="outline"
      />
    );
  });
}
