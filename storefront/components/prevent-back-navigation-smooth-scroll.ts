"use client";

import {useEffect} from "react";

export default function PreventBackNavigationSmoothScroll() {
  useEffect(() => {
    window.addEventListener("popstate", () => {
      // Disable smooth scroll
      document.documentElement.style.scrollBehavior = "auto";

      // Re-enable smooth scroll after a short delay
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth";
      }, 100);
    });
  }, []);

  return null;
}
