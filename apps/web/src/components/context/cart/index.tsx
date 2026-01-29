import { actions } from "astro:actions";
import type { HttpTypes } from "@medusajs/types";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import type { AddToCartEventPayload } from "./event-bus";
import { addToCartEventBus } from "./event-bus";
import {
  calculateCartTotal,
  generateOptimisticItemId,
  isOptimisticItemId,
} from "./utils";

type Cart = {
  promotions?: HttpTypes.StoreCartPromotion[];
} & HttpTypes.StoreCart;

const CartContext = createContext<
  | {
      cart: Cart | null;
      cartOpen: boolean;
      cartAddons: HttpTypes.StoreProduct[] | null;
      region?: HttpTypes.StoreRegion | null;
      handleDeleteItem: (lineItem: string) => void;
      handleUpdateCartQuantity: (lineItem: string, newQuantity: number) => void;
      isUpdating: boolean;
      setCartOpen: Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export function CartProvider({
  cart: initialCart,
  addons: initialAddons,
  region,
  children,
  countryCode,
}: PropsWithChildren<{
  cart: Cart | null;
  region?: HttpTypes.StoreRegion | null;
  addons: HttpTypes.StoreProduct[] | null;
  countryCode: string;
}>) {
  // Local state as source of truth (updated after server actions)
  const [cart, setCart] = useState(initialCart);
  const [optimisticCart, setOptimisticCart] = useOptimistic<Cart | null>(cart);
  const [cartOpen, setCartOpen] = useState(false);

  const addons = useMemo(() => {
    if (initialAddons && initialAddons.length > 0) {
      const filteredAddons = initialAddons?.filter(
        (p) =>
          !optimisticCart?.items
            ?.map(({ product_id }) => product_id)
            .includes(p.id)
      );

      return filteredAddons;
    }

    return [];
  }, [optimisticCart, initialAddons]);

  const [, startTransition] = useTransition();

  // biome-ignore lint/correctness/useExhaustiveDependencies: TODO
  const handleOptimisticAddToCart = useCallback(
    (payload: AddToCartEventPayload) => {
      setCartOpen(true);

      startTransition(async () => {
        setOptimisticCart((prev) => {
          const items = [...(prev?.items || [])];

          const existingItemIndex = items.findIndex(
            ({ variant }) => variant?.id === payload.productVariant.id
          );

          if (existingItemIndex > -1) {
            const item = items[existingItemIndex];
            items[existingItemIndex] = {
              ...item,
              quantity: item.quantity + 1,
            };
            return { ...prev, items } as Cart;
          }

          const priceAmount =
            payload.productVariant.calculated_price?.calculated_amount || 0;

          const newItem: HttpTypes.StoreCartLineItem = {
            cart: prev || ({} as HttpTypes.StoreCart),
            cart_id: prev?.id || "",
            discount_tax_total: 0,
            discount_total: 0,
            id: generateOptimisticItemId(payload.productVariant.id),
            is_discountable: false,
            is_tax_inclusive: false,
            item_subtotal: priceAmount,
            item_tax_total: 0,
            item_total: priceAmount,
            original_subtotal: priceAmount,
            original_tax_total: 0,
            original_total: priceAmount,
            product: payload.productVariant.product || undefined,
            product_id: payload.productVariant.product_id,
            quantity: 1,
            requires_shipping: true,
            subtotal: priceAmount,
            tax_total: 0,
            title: payload.productVariant.title || "",
            total: priceAmount,
            unit_price: priceAmount,
            variant: payload.productVariant || undefined,
            created_at: new Date(),
          };

          const newItems = [...items, newItem];

          const newTotal = calculateCartTotal(newItems);

          return { ...prev, item_total: newTotal, items: newItems } as Cart;
        });

        const result = await actions.cart.addToCart({
          quantity: 1,
          regionId: payload.regionId,
          variantId: payload.productVariant.id,
        });

        // Sync local state with server response
        if (result.data) {
          setCart(result.data as Cart);
        }
      });
    },
    [setCartOpen, setOptimisticCart, setCart]
  );

  useEffect(() => {
    addToCartEventBus.registerCartAddHandler(handleOptimisticAddToCart);
  }, [handleOptimisticAddToCart]);

  const handleDeleteItem = (lineItem: string) => {
    handleUpdateCartQuantity(lineItem, 0);
  };

  const handleUpdateCartQuantity = (lineItem: string, quantity: number) => {
    const item = optimisticCart?.items?.find(({ id }) => id === lineItem);

    if (!item) {
      return;
    }

    startTransition(async () => {
      setOptimisticCart((prev) => {
        if (!prev) {
          return prev;
        }

        const optimisticItems = prev.items
          ?.filter((_item) => _item.id !== lineItem || quantity !== 0)
          .map((_item) =>
            _item.id === lineItem ? { ..._item, quantity } : _item
          );

        const optimisticTotal = optimisticItems?.reduce(
          (acc, _item) => acc + _item.unit_price * _item.quantity,
          0
        );

        return {
          ...prev,
          item_subtotal: optimisticTotal || 0,
          items: optimisticItems,
        };
      });

      if (!isOptimisticItemId(lineItem)) {
        const result = await actions.cart.updateCartQuantity({
          countryCode,
          lineItem,
          quantity,
        });

        // Sync local state with server response
        if (result.data) {
          setCart(result.data as Cart);
        }
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        cartAddons: addons,
        region,
        cartOpen,
        handleDeleteItem,
        handleUpdateCartQuantity,
        isUpdating: JSON.stringify(cart) !== JSON.stringify(optimisticCart),
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
