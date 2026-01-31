/** biome-ignore-all lint/style/noNamespace: - */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="../worker-configuration.d.ts" />

// Cloudflare Workers Cache API extension
interface CacheStorage {
  default: Cache;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    countryCode: string;
    defaultCountryCode: string;
  }
}
