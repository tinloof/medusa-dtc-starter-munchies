import {cookies} from "next/headers";
import "server-only";

export const getAuthHeaders = async (): Promise<
  {authorization: string} | NonNullable<unknown>
> => {
  const token = (await cookies()).get("_medusa_jwt")?.value;

  if (token) {
    return {authorization: `Bearer ${token}`};
  }

  return {};
};

export const getCacheTag = async (tag: string): Promise<string> => {
  const cacheId = (await cookies()).get("_medusa_cache_id")?.value;

  if (cacheId) {
    return `${tag}-${cacheId}`;
  }

  return "";
};

export const getCacheHeaders = async (
  tag: string,
): Promise<{next: {tags: string[]}} | NonNullable<unknown>> => {
  const cacheTag = await getCacheTag(tag);

  if (cacheTag) {
    return {next: {tags: [`${cacheTag}`]}};
  }

  return {};
};

export const setAuthToken = async (token: string) => {
  (await cookies()).set("_medusa_jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeAuthToken = async () => {
  (await cookies()).set("_medusa_jwt", "", {maxAge: -1});
};

export const getCartId = async () => {
  return (await cookies()).get("_medusa_cart_id")?.value;
};

export const setCartId = async (cartId: string) => {
  (await cookies()).set("_medusa_cart_id", cartId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeCartId = async () => {
  (await cookies()).set("_medusa_cart_id", "", {maxAge: -1});
};
