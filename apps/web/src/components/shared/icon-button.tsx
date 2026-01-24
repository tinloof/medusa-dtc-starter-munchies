import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useState } from "react";

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
      className={iconButtonVariants({ className, disabled, size })}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/** biome-ignore lint/correctness/useImageSize: - */}
      <img
        alt={`${icon} icon`}
        className="h-full w-full shrink-0 transition-all duration-300"
        src={iconSrc}
      />
    </button>
  );
}
