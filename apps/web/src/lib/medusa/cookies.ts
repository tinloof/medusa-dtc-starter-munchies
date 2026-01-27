import type { AstroCookies } from "astro";

const MEDUSA_CART_COOKIE = "_medusa_cart_id";

export function getCartId(cookies: AstroCookies) {
  return cookies.get(MEDUSA_CART_COOKIE)?.value;
}

export const setCartId = (cookies: AstroCookies, cartId: string) => {
  cookies.set(MEDUSA_CART_COOKIE, cartId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};
