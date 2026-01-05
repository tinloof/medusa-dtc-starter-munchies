import { cx } from "class-variance-authority";
import {
  Climate_Crisis,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";

import dynamicFavicon from "./dynamic-favicon";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrumentSans",
  weight: ["400", "500", "600"],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrumentSerif",
  weight: ["400"],
});
const climateCrisis = Climate_Crisis({
  subsets: ["latin"],
  variable: "--font-climateCrisis",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cx(
        instrumentSans.variable,
        instrumentSerif.variable,
        climateCrisis.variable,
        "overflow-x-clip overscroll-y-none scroll-smooth"
      )}
      data-scroll-behavior="smooth"
      lang="en"
    >
      <head>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: TODO */}
        <script dangerouslySetInnerHTML={{ __html: dynamicFavicon }} />
      </head>
      {children}
    </html>
  );
}
