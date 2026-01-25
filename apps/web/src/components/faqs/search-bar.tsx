import { cx } from "class-variance-authority";
import { type KeyboardEvent, useEffect, useRef } from "react";
import { Icon } from "@/components/shared/icon";

interface SearchbarProps {
  className?: string;
  containerClassName?: string;
  keydownHandler?: (event: KeyboardEvent) => void;
  onChange?: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  query: string;
  setQuery: (query: string) => void;
}

export function SearchBar({
  className,
  keydownHandler = () => {
    return;
  },
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
        "relative mt-7 flex w-full items-start rounded-lg lg:max-w-105",
        className
      )}
    >
      <Icon
        className="absolute top-1/2 left-3.5 h-6 w-6 -translate-y-1/2"
        name="Search"
      />
      <input
        aria-label="Search"
        className="h-full w-full appearance-none rounded-lg border-[1.5px] border-accent bg-background py-2.5 pr-s pl-5xl font-medium font-sans text-accent text-body-base leading-[150%] outline-none placeholder:text-accent placeholder:opacity-60"
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
