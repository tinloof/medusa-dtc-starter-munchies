"use client";

import {cx} from "cva";
import {useEffect, useState} from "react";

export default function BottomBorder({
  DropdownOpen,
  className,
}: {
  DropdownOpen?: boolean;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cx(
        className,
        "h-[1.5px] w-screen bg-accent transition-all duration-300",
        {
          "opacity-0": !isVisible,
          "opacity-0 transition-none": DropdownOpen,
          "opacity-100": isVisible && !DropdownOpen,
        },
      )}
    />
  );
}
