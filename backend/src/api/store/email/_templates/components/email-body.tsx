import { Text } from "@react-email/components";
import { body } from "./style";

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
    <Text className="mb-[50px]" style={body}>
      Hi {firstName}, <br />
      {paragraphs.map((paragraph, index) => (
        <span key={index} style={body}>
          {paragraph}
          <br /> <br />
        </span>
      ))}
      {signature && (
        <span style={body}>
          Warm regards,
          <br /> The Munchies Team
        </span>
      )}
    </Text>
  );
}
