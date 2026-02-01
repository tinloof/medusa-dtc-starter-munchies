import { getCtx } from "./context";

interface CacheResult<T> {
  data: T;
  tags: string[];
}

interface CacheOptions<Args extends unknown[]> {
  tags: string[] | ((...args: Args) => string[]);
}

interface CachedData<T> {
  data: T;
  tags: string[];
}

export function withCache<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  options: CacheOptions<Args>
): (...args: Args) => Promise<CacheResult<T>> {
  const { tags: tagsOption } = options;
  const fnKey = fn.toString();

  return async (...args: Args): Promise<CacheResult<T>> => {
    const tags =
      typeof tagsOption === "function" ? tagsOption(...args) : tagsOption;
    const ctx = getCtx();
    const cache = typeof caches !== "undefined" ? caches.default : undefined;
    const key = `${fnKey}-${tags.join(",")}-${JSON.stringify(args)}`;

    // Skip cache in dev mode
    if (!cache) {
      console.log("[cache] SKIP", { tags, args });
      const data = await fn(...args);
      return { data, tags };
    }

    const cacheKey = new Request(`https://cache/${key}`);

    // Try cache first
    const cached = await cache.match(cacheKey);
    if (cached) {
      console.log("[cache] HIT", { tags, args });
      const result = (await cached.json()) as CachedData<T>;
      return { data: result.data, tags: result.tags };
    }

    // Execute function
    console.log("[cache] MISS", { tags, args });
    const data = await fn(...args);
    const result: CachedData<T> = { data, tags };

    // Store in cache
    const response = new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=31536000",
        "Cache-Tag": tags.join(","),
      },
    });

    // Non-blocking cache write
    if (ctx) {
      ctx.waitUntil(cache.put(cacheKey, response));
    } else {
      await cache.put(cacheKey, response);
    }

    return { data, tags };
  };
}
