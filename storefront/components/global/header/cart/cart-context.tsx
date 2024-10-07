"use client";

import type {StoreCart, StorePromotion} from "@medusajs/types";
import type {PropsWithChildren} from "react";

import {deleteLineItem, updateCartQuantity} from "@/actions/medusa/cart";
import {createContext, useContext, useOptimistic, useTransition} from "react";

type Cart = {
  promotions?: StorePromotion[];
} & StoreCart;

const CartContext = createContext<
  | {
      cart: Cart | null;
      handleDeleteItem: (lineItem: string) => Promise<void>;
      handleUpdateCartQuantity: (
        lineItem: string,
        newQuantity: number,
      ) => Promise<void>;
    }
  | undefined
>(undefined);

export function CartProvider({
  cart,
  children,
}: PropsWithChildren<{
  cart: Cart | null;
}>) {
  const [optimisticCart, setOptimisticCart] = useOptimistic<Cart | null>(cart);
  const [, startTransition] = useTransition();

  const handleDeleteItem = async (lineItem: string) => {
    startTransition(() => {
      setOptimisticCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items?.filter(({id}) => id !== lineItem),
        };
      });
    });
    await deleteLineItem({
      lineItem,
    });
  };

  const handleUpdateCartQuantity = async (
    lineItem: string,
    newQuantity: number,
  ) => {
    const item = optimisticCart?.items?.find(({id}) => id === lineItem);

    if (!item) return;

    const quantity = item.quantity + newQuantity;

    startTransition(() => {
      setOptimisticCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items?.map((item) =>
            item.id === lineItem ? {...item, quantity} : item,
          ),
        };
      });
    });
    await updateCartQuantity({
      lineItem,
      quantity: quantity + newQuantity,
    });
  };

  return (
    <CartContext.Provider
      value={{cart: optimisticCart, handleDeleteItem, handleUpdateCartQuantity}}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
