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
  const greeting = firstName ? `Hi ${firstName},` : "Hi,";

  return (
    <Text className="mb-[50px]" style={body}>
      {greeting} <br />
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
