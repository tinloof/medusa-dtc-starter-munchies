import type {
  HOME_QUERYResult,
  MODULAR_PAGE_QUERYResult,
} from "@/types/sanity.generated";

import SectionsRenderer from "@/components/sections/SectionRenderer";
import {notFound} from "next/navigation";

export function Page({
  data,
}: {
  data: HOME_QUERYResult | MODULAR_PAGE_QUERYResult;
}) {
  if (data?._type !== "home" && data?._type !== "modular.page")
    return notFound();

  return <SectionsRenderer fieldName="body" sections={data.sections} />;
}
