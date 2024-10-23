import {
  Container,
  Font,
  Head,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import React from "react";
import Footer from "./footer";
import { arial_font } from "./style";

export default function Layout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: string;
}) {
  return (
    <Section>
      <Head>
        <Font
          fontFamily="Arial"
          fallbackFontFamily="Helvetica"
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Times"
          fallbackFontFamily="serif"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
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
        <Section className="bg-white" style={arial_font}>
          <Container className="bg-background h-full w-full max-w-[640px]">
            <Section className=" text-accent">{children}</Section>
            <Footer />
          </Container>
        </Section>
      </Tailwind>
    </Section>
  );
}
