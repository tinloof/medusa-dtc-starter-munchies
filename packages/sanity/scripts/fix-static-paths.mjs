#!/usr/bin/env node

/**
 * Post-build script to fix Sanity Studio static asset paths.
 * Sanity builds with `/static/` paths, but when hosted under `/cms/`,
 * the assets are actually at `/cms/static/`.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../../../apps/web/public/cms");
const INDEX_HTML = resolve(OUTPUT_DIR, "index.html");

try {
  let html = readFileSync(INDEX_HTML, "utf-8");

  // Replace all /static/ references with /cms/static/
  const updatedHtml = html.replaceAll('"/static/', '"/cms/static/');

  if (html !== updatedHtml) {
    writeFileSync(INDEX_HTML, updatedHtml, "utf-8");
    console.log("✓ Fixed static asset paths in index.html");
  } else {
    console.log("✓ No static paths to fix");
  }
} catch (error) {
  console.error("✗ Failed to fix static paths:", error.message);
  process.exit(1);
}
