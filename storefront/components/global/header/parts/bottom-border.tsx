"use client";

import {useEffect, useState} from "react";

export default function BottomBorder() {
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
      className={`h-[1px] w-full bg-accent transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
