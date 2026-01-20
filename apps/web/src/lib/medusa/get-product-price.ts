import type { HttpTypes } from "@medusajs/types";

function convertToLocale({
  amount,
  currency_code,
}: {
  amount: number;
  currency_code: string;
}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency_code,
  }).format(amount / 100);
}

function getPercentageDiff(original: number, calculated: number) {
  const diff = original - calculated;
  const decrease = (diff / original) * 100;
  return decrease.toFixed();
}

export function getPricesForVariant(variant: HttpTypes.StoreProductVariant) {
  if (!variant?.calculated_price?.calculated_amount) {
    return null;
  }

  return {
    calculated_price: convertToLocale({
      amount: variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code ?? "USD",
    }),
    calculated_price_number: variant.calculated_price.calculated_amount,
    currency_code: variant.calculated_price.currency_code,
    original_price: convertToLocale({
      amount: variant.calculated_price.original_amount ?? 0,
      currency_code: variant.calculated_price.currency_code ?? "USD",
    }),
    original_price_number: variant.calculated_price.original_amount,
    percentage_diff: getPercentageDiff(
      variant.calculated_price.original_amount ?? 0,
      variant.calculated_price.calculated_amount
    ),
    price_type: variant.calculated_price.calculated_price?.price_list_type,
  };
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct;
  variantId?: string;
}) {
  if (!product?.id) {
    throw new Error("No product provided");
  }

  const cheapestPrice = () => {
    if (!product?.variants?.length) {
      return null;
    }

    const cheapestVariant: any = product.variants
      .filter((v: any) => !!v.calculated_price)
      .sort(
        (a: any, b: any) =>
          a.calculated_price.calculated_amount -
          b.calculated_price.calculated_amount
      )[0];

    return getPricesForVariant(cheapestVariant);
  };

  const variantPrice = () => {
    if (!(product && variantId)) {
      return null;
    }

    const variant: any = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    );

    if (!variant) {
      return null;
    }

    return getPricesForVariant(variant);
  };

  return {
    cheapestPrice: cheapestPrice(),
    product,
    variantPrice: variantPrice(),
  };
}
