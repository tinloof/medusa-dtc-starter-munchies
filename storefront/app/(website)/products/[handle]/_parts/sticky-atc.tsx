"use client";

import type {StoreProduct} from "@medusajs/types";

import {cx} from "cva";
import {useEffect, useState} from "react";

import {ProductVariantsProvider} from "../product-context";
import AddToCart from "./add-to-cart";
import OptionsSelect from "./options";

export default function StickyAtc({options, variants}: StoreProduct) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ProductVariantsProvider options={options} variants={variants}>
      <div
        className={cx(
          "fixed bottom-0 left-0 right-0 z-[80] w-screen border-t border-accent bg-background p-m transition-transform duration-300 lg:hidden",
          {
            "translate-y-0": isVisible,
            "translate-y-full": !isVisible,
          },
        )}
      >
        <div className="mt-s flex justify-between">
          {options && <OptionsSelect options={options} />}
          <AddToCart variant="sticky" />
        </div>
      </div>
    </ProductVariantsProvider>
  );
}
