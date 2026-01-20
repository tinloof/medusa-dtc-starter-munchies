import {
  Column,
  Link,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { footer } from "./style";

const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};
export default function Footer() {
  const year = getYear();

  return (
    <Section className="bg-accent text-background">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                background: "#FFF6E6",
                accent: "#FF5227",
              },
            },
          },
        }}
      >
        <Section className="mx-auto my-10 w-fit text-background">
          <Row>
            <Column align="center" className="pr-12">
              <Link
                className="text-background uppercase"
                href="/"
                style={footer}
              >
                INSTAGRAM
              </Link>
            </Column>

            <Column align="center" className="pr-12">
              <Link
                className="text-background uppercase"
                href="/"
                style={footer}
              >
                FACEBOOK
              </Link>
            </Column>
            <Column align="center" className="pr-0">
              <Link
                className="text-background uppercase"
                href="/"
                style={footer}
              >
                LINKEDIN
              </Link>
            </Column>
          </Row>
        </Section>

        <Section className="text-center">
          <Text className="pb-5" style={footer}>
            © {year} MUNCHIES
          </Text>
        </Section>
      </Tailwind>
    </Section>
  );
}
