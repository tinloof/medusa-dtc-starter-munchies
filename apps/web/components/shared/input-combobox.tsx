import {cx} from "cva";
import {forwardRef, useEffect, useState} from "react";

import Icon from "./icon";

export default forwardRef<
  HTMLInputElement,
  {
    defaultValue?: string;
    options: Array<{id: string; label: string}>;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(function Input(
  {
    className,
    defaultValue,
    name,
    options,
    placeholder,
    required,
    type,
    ...props
  },
  ref,
) {
  const [selectedOption, setSelectedOption] = useState<{
    id: string;
    label: string;
  } | null>(options[0] || null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(options[0]?.label || "");

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.id === defaultValue,
      );
      if (defaultOption) {
        setSelectedOption(defaultOption);
        setInputValue(defaultOption.label);
      }
    } else if (options.length > 0) {
      setSelectedOption(options[0]);
      setInputValue(options[0].label);
    }
  }, [defaultValue, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setIsOpen(true);
    setSelectedOption(null);
    const isValid = !!options.find(
      ({label}) => label.toLowerCase() === value.toLowerCase(),
    );

    if (!isValid) {
      event.target.setCustomValidity("Please select a valid option");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleOptionSelect = (option: {id: string; label: string}) => {
    setSelectedOption(option);
    setInputValue(option.label);
    setIsOpen(false);
    if (ref && "current" in ref && ref.current) {
      ref.current.setCustomValidity("");
      ref.current.value = option.id;
    }
  };

  const isDisabled = options.length === 1;

  return (
    <div className="relative w-full">
      <div className="relative flex w-full items-center">
        {!isDisabled && (
          <Icon
            className="absolute left-3 text-accent opacity-60"
            name="Search"
          />
        )}
        <input
          className={cx(
            className,
            "w-full rounded-lg border-[1.5px] border-accent bg-transparent py-[11px] pr-[16px] font-medium outline-none placeholder:font-medium placeholder:text-accent placeholder:opacity-60",
            {
              "pl-[16px]": isDisabled,
              "pl-10": !isDisabled,
              "size-4 border-2 border-accent bg-transparent p-1 accent-accent outline-none":
                type === "checkbox",
            },
          )}
          disabled={isDisabled}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={
            placeholder ? placeholder + (required ? "*" : "") : undefined
          }
          ref={ref}
          required={required}
          type={type}
          value={inputValue}
          {...props}
        />
        <input
          name={name}
          required={required}
          type="hidden"
          value={selectedOption ? selectedOption.id : ""}
        />
      </div>
      {isOpen && filteredOptions.length > 0 && !isDisabled && (
        <ul className="absolute z-10 mt-1 flex w-full flex-col gap-2 rounded-lg border border-accent bg-background px-2 py-2 shadow-lg">
          {filteredOptions.map((option) => (
            <li
              className="flex h-[40px] cursor-pointer items-center rounded-md px-4 hover:bg-secondary"
              key={option.id}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
