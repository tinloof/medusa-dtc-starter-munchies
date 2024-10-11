"use client";

import type { StoreCart, StorePromotion } from "@medusajs/types";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

import { deleteLineItem, updateCartQuantity } from "@/actions/medusa/cart";
import {
  createContext,
  useContext,
  useOptimistic,
  useState,
  useTransition,
} from "react";

type Cart = {
  promotions?: StorePromotion[];
} & StoreCart;

const CartContext = createContext<
  | {
    cart: Cart | null;
    cartOpen: boolean;
    handleDeleteItem: (lineItem: string) => Promise<void>;
    handleUpdateCartQuantity: (
      lineItem: string,
      newQuantity: number,
    ) => Promise<void>;
    setCartOpen: Dispatch<SetStateAction<boolean>>;
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
  const [cartOpen, setCartOpen] = useState(false);

  const [, startTransition] = useTransition();

  const handleDeleteItem = async (lineItem: string) => {
    startTransition(() => {
      setOptimisticCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items?.filter(({ id }) => id !== lineItem),
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
    const item = optimisticCart?.items?.find(({ id }) => id === lineItem);

    if (!item) return;

    const quantity = item.quantity + newQuantity;

    startTransition(() => {
      setOptimisticCart((prev) => {
        if (!prev) return prev;


        const optimisticItems = prev.items?.map((item) =>
          item.id === lineItem ? { ...item, quantity } : item
        )

        const optimisticTotal = optimisticItems?.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);


        return {
          ...prev,
          total: optimisticTotal || 0,
          items: optimisticItems
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
      value={{
        cart: optimisticCart,
        cartOpen,
        handleDeleteItem,
        handleUpdateCartQuantity,
        setCartOpen,
      }}
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
