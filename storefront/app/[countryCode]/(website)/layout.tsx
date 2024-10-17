import type {Metadata} from "next";

import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import PreventBackNavigationSmoothScroll from "@/components/prevent-back-navigation-smooth-scroll";
import config from "@/config";
import {loadGlobalData} from "@/data/sanity";
import {getOgImages} from "@/data/sanity/resolve-sanity-route-metadata";

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

export default async function Layout({children}: {children: React.ReactNode}) {
  const data = await loadGlobalData();

  return (
    <>
      <PreventBackNavigationSmoothScroll />
      {data.header && <Header {...data.header} />}
      <main className="flex-1">{children}</main>
      {data.footer && <Footer {...data.footer} />}
    </>
  );
}
