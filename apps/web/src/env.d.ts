/// <reference path="../.astro/types.d.ts" />
/// <reference types="../worker-configuration.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    countryCode: string;
    restPath: string;
    isDefaultCountry: boolean;
  }
}

