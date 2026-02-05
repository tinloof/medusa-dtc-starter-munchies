import { createHashHistory, type History, type Listener } from "history";
import React from "react";

import { Studio } from "sanity";
import config from "sanity.config";

if (!config) {
  throw new Error(
    "[@sanity/astro]: Can't load Sanity Studio. Check that you've configured it in `sanity.config.js|ts`."
  );
}

export function StudioComponent() {
  const history = React.useMemo(() => createHashHistoryForStudio(), []);
  return (
    <div
      data-ui="AstroStudioLayout"
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overscrollBehavior: "none",
        WebkitFontSmoothing: "antialiased",
        overflow: "hidden",
      }}
    >
      <Studio config={config} unstable_history={history} />
    </div>
  );
}

function createHashHistoryForStudio(): History {
  const history = createHashHistory();
  return {
    get action() {
      return history.action;
    },
    get location() {
      return history.location;
    },
    get createHref() {
      return history.createHref;
    },
    get push() {
      return history.push;
    },
    get replace() {
      return history.replace;
    },
    get go() {
      return history.go;
    },
    get back() {
      return history.back;
    },
    get forward() {
      return history.forward;
    },
    get block() {
      return history.block;
    },
    // Overriding listen to workaround a problem where native history provides history.listen(location => void), but the npm package is history.listen(({action, location}) => void)
    listen(listener: Listener) {
      return history.listen(({ location }) => {
        // @ts-expect-error -- working around a bug? in studio
        listener(location);
      });
    },
  };
}
