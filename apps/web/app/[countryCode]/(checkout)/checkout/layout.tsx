import type {PageProps} from "@/types";
import type {Metadata} from "next";
import type {PropsWithChildren} from "react";

import Footer from "@/components/global/footer";
import BottomBorder from "@/components/global/header/parts/bottom-border";
import PreventBackNavigationSmoothScroll from "@/components/prevent-back-navigation-smooth-scroll";
import LocalizedLink from "@/components/shared/localized-link";
import config from "@/config";
import {loadGlobalData} from "@/data/sanity";
import {getOgImages} from "@/data/sanity/resolve-sanity-route-metadata";

type LayoutProps = PropsWithChildren<
  Omit<PageProps<"countryCode">, "searchParams">
>;

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadGlobalData();

  return {
    openGraph: {
      images: !data?.fallbackOGImage
        ? undefined
        : getOgImages(data.fallbackOGImage),
      title: config.siteName,
    },
    title: config.siteName,
  };
}

export default async function Layout(props: LayoutProps) {
  const {children} = props;

  const data = await loadGlobalData();

  return (
    <>
      <PreventBackNavigationSmoothScroll />
      <div className="sticky top-0 z-20 w-screen bg-background">
        <div className="mx-auto my-s w-full max-w-max-screen bg-background px-m lg:px-xl">
          <LocalizedLink href="/" prefetch>
            <img
              alt="Mubchies logo"
              className="h-[22px] w-fit lg:h-8"
              src="/images/logo.svg"
            />
          </LocalizedLink>
        </div>
        <BottomBorder />
      </div>
      <main className="flex-1">{children}</main>
      {data.footer && <Footer variant="simple" {...data.footer} />}
    </>
  );
}
