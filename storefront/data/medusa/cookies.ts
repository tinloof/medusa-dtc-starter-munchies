import {cookies} from "next/headers";
import "server-only";

export const getAuthHeaders = ():
  | {authorization: string}
  | NonNullable<unknown> => {
  const token = cookies().get("_medusa_jwt")?.value;

  if (token) {
    return {authorization: `Bearer ${token}`};
  }

  return {};
};

export const getCacheTag = (tag: string): string => {
  const cacheId = cookies().get("_medusa_cache_id")?.value;

  if (cacheId) {
    return `${tag}-${cacheId}`;
  }

  return "";
};

export const getCacheHeaders = (
  tag: string,
): {next: {tags: string[]}} | NonNullable<unknown> => {
  const cacheTag = getCacheTag(tag);

  if (cacheTag) {
    return {next: {tags: [`${cacheTag}`]}};
  }

  return {};
};

export const setAuthToken = (token: string) => {
  cookies().set("_medusa_jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeAuthToken = () => {
  cookies().set("_medusa_jwt", "", {
    maxAge: -1,
  });
};

export const getCartId = () => {
  return cookies().get("_medusa_cart_id")?.value;
};

export const setCartId = (cartId: string) => {
  cookies().set("_medusa_cart_id", cartId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeCartId = () => {
  cookies().set("_medusa_cart_id", "", {maxAge: -1});
};
