import { cx } from "class-variance-authority";
import Label from "./typography/Label";

interface TagProps {
  className?: string;
  text: string | undefined;
}

export default function Tag({ className, text }: TagProps) {
  return (
    <Label
      className={cx("bg-secondary px-1 py-px text-end text-accent", className)}
      desktopSize="sm"
      font="display"
      mobileSize="2xs"
    >
      {text}
    </Label>
  );
}
