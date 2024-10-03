import {cx} from "cva";
import React from "react";

export default function Tag({
  className,
  text,
}: {
  className?: string;
  text: string | undefined;
}) {
  return (
    <div
      className={cx(
        "climate-label-sm bg-secondary text-accent px-1 py-px",
        className,
      )}
    >
      {text}
    </div>
  );
}
