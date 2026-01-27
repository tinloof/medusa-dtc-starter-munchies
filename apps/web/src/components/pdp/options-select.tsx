import type { StoreProductOption } from "@medusajs/types";
import { useProductVariants } from "@/components/context/product-context";
import { Select } from "@/components/shared/select";

interface Props {
  options: StoreProductOption[];
}

export function OptionsSelect({ options }: Props) {
  const { selectedOptions, setSelectedOptions } = useProductVariants();

  return options?.map((option) => {
    const values = option.values?.map(({ value }) => ({
      label: value.toLowerCase(),
      value: value.toLowerCase(),
    }));

    if (!values || values.length <= 1) {
      return null;
    }
    const activeOption = selectedOptions[option.title.toLowerCase()];
    const setOption = (value: string) =>
      setSelectedOptions((prev) => ({
        ...prev,
        [option.title.toLowerCase()]: value,
      }));

    return (
      <Select
        className="w-fit"
        key={option.id}
        options={values}
        placeholder={activeOption}
        setOption={setOption}
        variant="outline"
      />
    );
  });
}
