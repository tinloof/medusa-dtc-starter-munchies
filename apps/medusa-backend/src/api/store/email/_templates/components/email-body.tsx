import { Text } from "@react-email/components";
import { body } from "./style";

type EmailBodyProps = {
  firstName?: string;
  paragraphs: string[];
  signature?: boolean;
};

export default function EmailBody({
  firstName,
  paragraphs,
  signature,
}: EmailBodyProps) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi,";

  return (
    <Text className="mb-5xl" style={body}>
      {greeting} <br />
      {paragraphs.map((paragraph, index) => (
        <span key={index.toString()} style={body}>
          {paragraph}
          <br /> <br />
        </span>
      ))}
      {signature ? (
        <span style={body}>
          Warm regards,
          <br /> The Munchies Team
        </span>
      ) : null}
    </Text>
  );
}
