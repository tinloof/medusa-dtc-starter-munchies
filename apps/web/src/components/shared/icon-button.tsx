import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Icon } from "@/generated/Icon";
import {
  ARROW_LEFT_ACCENT,
  ARROW_LEFT_PRIMARY,
  ARROW_RIGHT_ACCENT,
  ARROW_RIGHT_PRIMARY,
} from "@/generated/icons";

export const icons = {
  ArrowLeft: {
    accent: ARROW_LEFT_ACCENT,
    primary: ARROW_LEFT_PRIMARY,
  },
  ArrowRight: {
    accent: ARROW_RIGHT_ACCENT,
    primary: ARROW_RIGHT_PRIMARY,
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
        true: "pointer-events-none opacity-50 focus:outline-none",
      },
      size: {
        full: "size-full",
        lg: "size-[60px]",
        sm: "size-10",
        xs: "size-8",
      },
    },
  }
);

export type IconButtonProps = {
  disabled?: boolean;
  icon: keyof typeof icons;
} & ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants>;

export function IconButton({
  className,
  disabled = false,
  icon,
  size,
  ...props
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconHref =
    isHovered && !disabled ? icons[icon].primary : icons[icon].accent;

  return (
    <button
      className={iconButtonVariants({ className, disabled, size })}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <Icon
        className="h-full w-full shrink-0 transition-all duration-300"
        href={iconHref}
      />
    </button>
  );
}
