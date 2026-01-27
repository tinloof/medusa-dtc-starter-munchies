import type { StoreProductVariant } from "@medusajs/types";

export interface AddToCartEventPayload {
  productVariant: StoreProductVariant;
  regionId: string;
}

type CartAddEventHandler = (payload: AddToCartEventPayload) => void;

interface CartAddEventBus {
  emitCartAdd: (payload: AddToCartEventPayload) => void;
  handler: CartAddEventHandler;
  registerCartAddHandler: (handler: CartAddEventHandler) => void;
}

export const addToCartEventBus: CartAddEventBus = {
  emitCartAdd(payload: AddToCartEventPayload) {
    this.handler(payload);
  },

  handler: () => {
    return;
  },

  registerCartAddHandler(handler: CartAddEventHandler) {
    this.handler = handler;
  },
};
