import type {VariantProps} from "cva";

import {cva} from "cva";

export const bodyStyles = cva("", {
  defaultVariants: {
    font: "serif",
    mobileSize: "base",
  },
  variants: {
    desktopSize: {
      "2xl": "lg:text-body-2xl",
      "4xl": "lg:text-body-4xl",
      "6xl": "lg:text-body-6xl",
      base: "lg:text-body-base ",
      lg: "lg:text-body-lg",
      sm: "lg:text-body-sm",
      xl: "lg:text-body-xl",
      xs: "lg:text-body-xs",
    },
    font: {
      climate: "font-climate font-normal uppercase",
      sans: "font-sans font-medium leading-[150%]",
      serif: "font-serif font-normal leading-[150%]",
    },
    mobileSize: {
      "2xl": "text-body-2xl",
      "3xl": "text-body-3xl",
      "4xl": "text-body-4xl",
      "6xl": "text-body-6xl",
      base: "text-body-base ",
      lg: "text-body-lg",
      sm: "text-body-sm",
      xl: "text-body-xl",
      xs: "text-body-xs",
    },
  },
});
type BodyProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof bodyStyles>;

export default function Body({
  children,
  className,
  desktopSize,
  font,
  mobileSize,
  ...rest
}: BodyProps) {
  return (
    <p
      className={bodyStyles({className, desktopSize, font, mobileSize})}
      {...rest}
    >
      {children}
    </p>
  );
}
