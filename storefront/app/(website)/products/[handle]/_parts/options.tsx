import type {StoreProductOption} from "@medusajs/types";

import Select from "@/components/shared/select";

type Props = {
  options: StoreProductOption[];
};

export default function OptionsSelect({options}: Props) {
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
