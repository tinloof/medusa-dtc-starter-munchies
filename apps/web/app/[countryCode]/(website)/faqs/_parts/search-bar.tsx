import Icon from "@/components/shared/icon";
import {cx} from "cva";
import {type KeyboardEvent, useEffect, useRef} from "react";

type SearchbarProps = {
  className?: string;
  containerClassName?: string;
  keydownHandler?: (event: KeyboardEvent) => void;
  onChange?: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  query: string;
  setQuery: (query: string) => void;
};

export default function SearchBar({
  className,
  keydownHandler = () => {},
  onChange,
  onSearch,
  placeholder,
  query,
  setQuery,
}: SearchbarProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 150);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  const handleSearch = (searchQuery: string) => {
    if (onChange) {
      onChange();
    }
    setQuery(searchQuery);
  };

  return (
    <div
      className={cx(
        "relative mt-7 flex w-full items-start rounded-lg lg:max-w-[420px]",
        className,
      )}
    >
      <Icon
        className="absolute left-[14px] top-1/2 h-6 w-6 -translate-y-1/2"
        name="Search"
      />
      <input
        aria-label="Search"
        className="h-full w-full appearance-none rounded-lg border-[1.5px] border-accent bg-background py-[10px] pl-[50px] pr-s font-sans text-body-base font-medium leading-[150%] text-accent outline-none placeholder:text-accent placeholder:opacity-60"
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={keydownHandler}
        placeholder={placeholder ?? "Search"}
        ref={ref}
        type="text"
        value={query}
      />
    </div>
  );
}
