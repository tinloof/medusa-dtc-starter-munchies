import {cx} from "cva";

export default function Tag({
  className,
  text,
}: {
  className?: string;
  text: string | undefined;
}) {
  return (
    <div className={cx("bg-secondary px-1 py-px text-accent", className)}>
      {text}
    </div>
  );
}
