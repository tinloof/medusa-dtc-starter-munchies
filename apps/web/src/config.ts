import {
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
} from "astro:env/client";
import { SANITY_TOKEN } from "astro:env/server";

const config = {
  defaultCountryCode: "us",
  // Supported country codes - paths not matching these will use default
  supportedCountryCodes: [
    "us",
    "dk",
    "fr",
    "de",
    "es",
    "jp",
    "gb",
    "ca",
    "dz",
    "ar",
    "za",
    "mx",
    "my",
    "au",
    "nz",
    "br",
  ],
  sanity: {
    apiVersion: "2026-01-16",
    dataset: PUBLIC_SANITY_STUDIO_DATASET,
    projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
    studioUrl: "/cms",
    // Not exposed to the front-end, used solely by the server
    token: SANITY_TOKEN,
  },
  title: "Munchies",
  description: "Delicious cookies delivered to your door",
};

export default config;
