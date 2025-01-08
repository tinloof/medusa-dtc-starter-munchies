import type {NativeSelectProps} from "@/modules/common/components/native-select";
import type {HttpTypes} from "@medusajs/types";

import NativeSelect from "@/modules/common/components/native-select";
import {forwardRef, useImperativeHandle, useMemo, useRef} from "react";

const CountrySelect = forwardRef<
  HTMLSelectElement,
  {
    region?: HttpTypes.StoreRegion;
  } & NativeSelectProps
>(({defaultValue, placeholder = "Country", region, ...props}, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current,
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries?.map((country) => ({
      label: country.display_name,
      value: country.iso_2,
    }));
  }, [region]);

  return (
    <NativeSelect
      defaultValue={defaultValue}
      placeholder={placeholder}
      ref={innerRef}
      {...props}
    >
      {countryOptions?.map(({label, value}, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  );
});

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
