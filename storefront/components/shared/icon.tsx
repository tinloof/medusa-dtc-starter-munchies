import {cx} from "cva";
import {type ComponentProps} from "react";

export const icons = {
  AccordionBottom: "/icons/accordion-bottom.svg",
  AccordionTop: "/icons/accordion-top.svg",
  ArrowLeft: "/icons/arrow-left-primary.svg",
  ArrowLeftAccent: "/icons/arrow-left-accent.svg",
  ArrowRight: "/icons/arrow-right-primary.svg",
  ArrowRightAccent: "/icons/arrow-right-accent.svg",
  Cart: "/icons/cart.svg",
  Close: "/icons/close.svg",
  Hamburger: "/icons/hamburger.svg",
  LoadingAccent: "/icons/loading-accent.svg",
  LoadingPrimary: "/icons/loading-primary.svg",
  Search: "/icons/search.svg",
};

export type IconProps = {name: keyof typeof icons} & Omit<
  ComponentProps<"img">,
  "sizes" | "src" | "srcSet"
>;

export default function Icon({alt, className, name, ...rest}: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt || name}
      className={cx(className)}
      src={icons[name]}
      {...rest}
    />
  );
}
