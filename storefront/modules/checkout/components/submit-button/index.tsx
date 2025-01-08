"use client";

import type {ButtonProps} from "@/components/shared/button";

import {Cta} from "@/components/shared/button";
import React from "react";
import {useFormStatus} from "react-dom";

export function SubmitButton({
  children,
  className,
  "data-testid": dataTestId,
  isLoading,
  size = "lg",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
  isLoading?: boolean;
  size?: ButtonProps["size"];
  variant?: "outline" | "primary"; // "danger" | "primary" | "secondary" | "transparent" | null;
}) {
  const {pending} = useFormStatus();

  return (
    <Cta
      className={className}
      data-testid={dataTestId}
      loading={pending || isLoading}
      size={size}
      type="submit"
      variant={variant || "primary"}
    >
      {children}
    </Cta>
  );
}
