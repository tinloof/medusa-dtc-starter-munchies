import {cx} from "cva";
import {forwardRef, useState, useEffect} from "react";
import Icon from "./icon"; // Assuming Icon component is in the same directory

export default forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    options: Array<{id: string; label: string}>;
    defaultValue?: string;
  }
>(function Input(
  {
    className,
    placeholder,
    required,
    type,
    options,
    defaultValue,
    name,
    ...props
  },
  ref,
) {
  const [selectedOption, setSelectedOption] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.id === defaultValue,
      );
      if (defaultOption) {
        setSelectedOption(defaultOption);
        setInputValue(defaultOption.label);
      }
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

  return (
    <div className="relative w-full">
      <div className="relative flex w-full items-center">
        <Icon
          name="Search"
          className="absolute left-3 text-accent opacity-60"
        />
        <input
          className={cx(
            className,
            "w-full rounded-lg border-[1.5px] border-accent bg-transparent py-[11px] pl-10 pr-[16px] font-medium outline-none placeholder:font-medium placeholder:text-accent placeholder:opacity-60",
            {
              "size-4 border-2 border-accent bg-transparent p-1 accent-accent outline-none":
                type === "checkbox",
            },
          )}
          placeholder={
            placeholder ? placeholder + (required ? "*" : "") : undefined
          }
          ref={ref}
          required={required}
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          {...props}
        />
        <input
          type="hidden"
          name={name}
          value={selectedOption ? selectedOption.id : ""}
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 flex w-full flex-col gap-2 rounded-lg border border-accent bg-background px-2 py-2 shadow-lg">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="flex h-[40px] cursor-pointer items-center rounded-md px-4 hover:bg-secondary"
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
