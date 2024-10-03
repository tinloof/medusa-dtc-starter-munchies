"use client";
import type {VariantProps} from "cva";
import type {ComponentProps} from "react";

import {cva} from "cva";
import {useState} from "react";

export const icons = {
  ArrowLeft: {
    accent: "/icons/arrow-left-accent.svg",
    primary: "/icons/arrow-left-primary.svg",
  },
  ArrowRight: {
    accent: "/icons/arrow-right-accent.svg",
    primary: "/icons/arrow-right-primary.svg",
  },
};

const iconButtonVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300 hover:bg-accent",
  {
    defaultVariants: {
      disabled: false,
      size: "sm",
    },
    variants: {
      disabled: {
        false: "",
        true: "opacity-50 focus:outline-none pointer-events-none",
      },
      size: {
        lg: "w-[60px] h-[60px]",
        sm: "w-10 h-10",
      },
    },
  },
);

export type IconButtonProps = {
  disabled?: boolean;
  icon: keyof typeof icons;
} & ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants>;

export default function IconButton({
  className,
  disabled = false,
  icon,
  size,
  ...props
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconSrc =
    isHovered && !disabled ? icons[icon].primary : icons[icon].accent;

  return (
    <button
      className={iconButtonVariants({className, disabled, size})}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={`${icon} icon`}
        className="h-full w-full flex-shrink-0 transition-all duration-300"
        src={iconSrc}
      />
    </button>
  );
}
