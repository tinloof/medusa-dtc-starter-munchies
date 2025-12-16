"use client";

import config from "@/sanity.config";
import {NextStudio} from "next-sanity/studio";
import {useEffect, useState} from "react";

export function Studio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <NextStudio config={config} /> : null;
}
