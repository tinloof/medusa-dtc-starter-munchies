import {
  Container,
  Font,
  Head,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
} from "@react-email/components";
import type React from "react";
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
          fallbackFontFamily="Helvetica"
          fontFamily="Arial"
          fontStyle="normal"
          fontWeight={400}
        />
        <Font
          fallbackFontFamily="serif"
          fontFamily="Times"
          fontStyle="normal"
          fontWeight={400}
        />
      </Head>
      <Preview>{preview}</Preview>
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
        <Section className="bg-white" style={arial_font}>
          <Container className="h-full w-full max-w-[640px] bg-background">
            <Section className="text-accent">{children}</Section>
            <Footer />
          </Container>
        </Section>
      </Tailwind>
    </Section>
  );
}
