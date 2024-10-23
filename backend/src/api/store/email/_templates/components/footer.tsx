import {
  Column,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { arial_font } from "./style";

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
            <Column className="pr-10" align="center">
              <Link style={arial_font} href="/" className="text-background">
                INSTAGRAM
              </Link>
            </Column>

            <Column className="pr-10" align="center">
              <Link style={arial_font} href="/" className="text-background">
                FACEBOOK
              </Link>
            </Column>
            <Column className="pr-0" align="center">
              <Link style={arial_font} href="/" className="text-background">
                LINKEDIN
              </Link>
            </Column>
          </Row>
        </Section>

        <Section className=" text-center">
          <Text style={arial_font} className="mb-5">
            © {year} MUNCHIES
          </Text>
        </Section>
      </Tailwind>
    </Section>
  );
}
