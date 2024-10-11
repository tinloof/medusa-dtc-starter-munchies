"use client";

import type { StoreCart, StorePromotion } from "@medusajs/types";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

import { updateCartQuantity } from "@/actions/medusa/cart";
import {
    createContext,
    useContext,
    useEffect,
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

  useEffect(() => {
    if (optimisticCart?.items?.length !== cart?.items?.length) {
      setCartOpen(true);
    }
  }, [optimisticCart?.items?.length, cart?.items?.length]);

  const [, startTransition] = useTransition();

  const handleDeleteItem = async (lineItem: string) => {
    handleUpdateCartQuantity(lineItem, 0);
  };

  const handleUpdateCartQuantity = async (
    lineItem: string,
    quantity: number,
  ) => {
    const item = optimisticCart?.items?.find(({id}) => id === lineItem);

    if (!item) return;

    startTransition(() => {
      setOptimisticCart((prev) => {
        if (!prev) return prev;

        const optimisticItems = prev.items?.map((item) =>
          item.id === lineItem ? {...item, quantity} : item,
        );

        const optimisticTotal = optimisticItems?.reduce(
          (acc, item) => acc + item.unit_price * item.quantity,
          0,
        );

        return {
          ...prev,
          items: optimisticItems,
          total: optimisticTotal || 0,
        };
      });
    });
    await updateCartQuantity({
      lineItem,
      quantity,
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
