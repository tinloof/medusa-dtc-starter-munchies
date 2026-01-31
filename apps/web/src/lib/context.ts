import { AsyncLocalStorage } from "node:async_hooks";
import type { Runtime } from "@astrojs/cloudflare";
import type { AstroCookies } from "astro";

type Ctx = Runtime["runtime"]["ctx"];

interface RequestContext {
  ctx: Ctx;
  cookies: AstroCookies;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export const getCtx = () => requestContext.getStore()?.ctx;
export const getCookies = () => requestContext.getStore()?.cookies;
