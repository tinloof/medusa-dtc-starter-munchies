import {
  type HistoryAdapter,
  type HistoryAdapterNavigate,
  VisualEditing,
} from "@sanity/visual-editing/react";
import { useEffect, useRef } from "react";

export interface VisualEditingOptions {
  zIndex?: number;
}

export function VisualEditingComponent({ zIndex }: VisualEditingOptions) {
  const navigateRef = useRef<HistoryAdapterNavigate>(null);

  // Notify presentation tool when page navigates (for Astro View Transitions)
  useEffect(() => {
    const handleNavigate = () => {
      navigateRef.current?.({
        type: "push",
        url: window.location.pathname + window.location.search,
      });
    };

    document.addEventListener("astro:page-load", handleNavigate);
    window.addEventListener("popstate", handleNavigate);

    return () => {
      document.removeEventListener("astro:page-load", handleNavigate);
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  const history: HistoryAdapter = {
    subscribe: (callback) => {
      navigateRef.current = callback;
      // Report initial URL so Studio knows where iframe is
      callback({
        type: "replace",
        url: window.location.pathname + window.location.search,
      });
      return () => {
        navigateRef.current = null;
      };
    },
    update: (update) => {
      const url = new URL(update.url, window.location.origin);
      if (
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) {
        window.location.href = url.pathname + url.search;
      }
    },
  };

  return (
    <VisualEditing
      history={history}
      portal
      refresh={() => {
        window.location.reload();
        return Promise.resolve();
      }}
      zIndex={zIndex}
    />
  );
}
