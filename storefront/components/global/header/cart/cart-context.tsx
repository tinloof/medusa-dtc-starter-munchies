"use client";

import type {
  StoreCart,
  StoreCartLineItem,
  StorePromotion,
} from "@medusajs/types";
import type {Dispatch, PropsWithChildren, SetStateAction} from "react";

import {addToCart, updateCartQuantity} from "@/actions/medusa/cart";
import {
  createContext,
  useContext,
  useEffect,
  useOptimistic,
  useRef,
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
      handleAddToCart: (
        variantId: string,
        quantity: number,
        countryCode: string,
      ) => Promise<void>;
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

  const cartRef = useRef(optimisticCart);

  useEffect(() => {
    const cartContentsChanged =
      JSON.stringify(cartRef.current) !== JSON.stringify(optimisticCart);

    if (cartContentsChanged) {
      setCartOpen(true);
      cartRef.current = optimisticCart;
    }
  }, [optimisticCart]);

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

        const optimisticItems = prev.items?.reduce(
          (acc: StoreCartLineItem[], item) => {
            if (item.id === lineItem) {
              return quantity === 0 ? acc : [...acc, {...item, quantity}];
            }
            return [...acc, item];
          },
          [],
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

  const handleAddToCart = async (
    variantId: string,
    quantity: number,
    region_id: string,
  ) => {
    setCartOpen(true);

    await addToCart({
      quantity,
      region_id,
      variantId,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        cartOpen,
        handleAddToCart,
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
