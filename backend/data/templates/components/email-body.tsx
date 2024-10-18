import { Text } from "@react-email/components";
import React from "react";
import { Body } from "./style";

interface EmailBodyProps {
  firstName?: string;
  paragraphs: string[];
  signature?: boolean;
}

export default function EmailBody({
  firstName,
  paragraphs,
  signature,
}: EmailBodyProps) {
  return (
    <Text className="mb-[50px]" style={Body}>
      Hi {firstName}, <br />
      {paragraphs.map((paragraph, index) => (
        <span key={index}>
          {paragraph}
          <br /> <br />
        </span>
      ))}
      {signature && (
        <>
          Warm regards,
          <br /> The Munchies Team
        </>
      )}
    </Text>
  );
}
