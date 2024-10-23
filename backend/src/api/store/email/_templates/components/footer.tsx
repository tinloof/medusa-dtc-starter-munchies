import {
  Column,
  Link,
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
        <Section className="mx-auto my-10 w-fit text-background ">
          <Row>
            <Column className="pr-12" align="center">
              <Link
                href="/"
                className="text-background uppercase"
                style={footer}
              >
                INSTAGRAM
              </Link>
            </Column>

            <Column className="pr-12" align="center">
              <Link
                href="/"
                className="text-background uppercase"
                style={footer}
              >
                FACEBOOK
              </Link>
            </Column>
            <Column className="pr-0" align="center">
              <Link
                href="/"
                className="text-background uppercase"
                style={footer}
              >
                LINKEDIN
              </Link>
            </Column>
          </Row>
        </Section>

        <Section className="text-center">
          <Text style={footer} className="pb-5">
            © {year} MUNCHIES
          </Text>
        </Section>
      </Tailwind>
    </Section>
  );
}
