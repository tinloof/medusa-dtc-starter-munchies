import type {StoreProductVariant} from "@medusajs/types";

export type AddToCartEventPayload = {
  productVariant: StoreProductVariant;
  regionId: string;
};

type CartAddEventHandler = (payload: AddToCartEventPayload) => void;

type CartAddEventBus = {
  emitCartAdd: (payload: AddToCartEventPayload) => void;
  handler: CartAddEventHandler;
  registerCartAddHandler: (handler: CartAddEventHandler) => void;
};

export const addToCartEventBus: CartAddEventBus = {
  emitCartAdd(payload: AddToCartEventPayload) {
    console.debug("[addToCartEventBus] emitCartAdd", payload);
    this.handler(payload);
  },

  handler: () => {},

  registerCartAddHandler(handler: CartAddEventHandler) {
    console.debug("[addToCartEventBus] registerCartAddHandler", handler);
    this.handler = handler;
  },
};
