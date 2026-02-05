import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";

// Load env from web app
config({ path: resolve(import.meta.dirname, "../../web/.env") });

const MEDUSA_BACKEND_URL = process.env.PUBLIC_MEDUSA_BACKEND_URL;
const MEDUSA_PUBLISHABLE_KEY = process.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY;

if (!(MEDUSA_BACKEND_URL && MEDUSA_PUBLISHABLE_KEY)) {
  console.error("Missing MEDUSA_BACKEND_URL or MEDUSA_PUBLISHABLE_KEY");
  process.exit(1);
}

const backendUrl: string = MEDUSA_BACKEND_URL;
const publishableKey: string = MEDUSA_PUBLISHABLE_KEY;

interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
}

interface MedusaVariant {
  id: string;
  title: string;
  sku: string | null;
  calculated_price?: {
    calculated_amount: number;
    original_amount: number;
    currency_code: string;
  };
}

interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  collection_id: string | null;
  collection?: { id: string; title: string } | null;
  type?: { id: string; value: string } | null;
  variants?: MedusaVariant[];
}

interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
}

interface MedusaCollection {
  id: string;
  title: string;
  handle: string;
}

interface VariantPrice {
  calculated_amount: number;
  original_amount: number;
  currency_code: string;
}

interface SearchVariant {
  id: string;
  title: string;
  sku: string | null;
  prices: Record<string, VariantPrice>; // keyed by region_id
}

interface SearchProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  collection_id: string;
  collection: string;
  category_ids: string[];
  categories: string[];
  type: { id: string; value: string } | null;
  variants: SearchVariant[];
}

async function fetchRegions(): Promise<MedusaRegion[]> {
  const url = `${backendUrl}/store/regions?limit=100`;
  const res = await fetch(url, {
    headers: { "x-publishable-api-key": publishableKey },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch regions: ${res.status}`);
  }

  const data = (await res.json()) as { regions: MedusaRegion[] };
  return data.regions;
}

async function fetchProducts(
  regionId: string,
  offset = 0,
  limit = 100
): Promise<MedusaProduct[]> {
  const fields = "+type,+variants.calculated_price";
  const url = `${backendUrl}/store/products?offset=${offset}&limit=${limit}&fields=${fields}&region_id=${regionId}`;
  const res = await fetch(url, {
    headers: { "x-publishable-api-key": publishableKey },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = (await res.json()) as { products: MedusaProduct[] };
  return data.products;
}

async function fetchAllProducts(regionId: string): Promise<MedusaProduct[]> {
  const allProducts: MedusaProduct[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const batch = await fetchProducts(regionId, offset, limit);
    if (batch.length === 0) {
      break;
    }
    allProducts.push(...batch);
    if (batch.length < limit) {
      break;
    }
    offset += limit;
  }

  return allProducts;
}

async function fetchCategories(): Promise<MedusaCategory[]> {
  const url = `${backendUrl}/store/product-categories?limit=100`;
  const res = await fetch(url, {
    headers: { "x-publishable-api-key": publishableKey },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const data = (await res.json()) as { product_categories: MedusaCategory[] };
  return data.product_categories;
}

async function fetchCollections(): Promise<MedusaCollection[]> {
  const url = `${backendUrl}/store/collections?limit=100`;
  const res = await fetch(url, {
    headers: { "x-publishable-api-key": publishableKey },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch collections: ${res.status}`);
  }

  const data = (await res.json()) as { collections: MedusaCollection[] };
  return data.collections;
}

async function fetchProductsInCategory(categoryId: string): Promise<string[]> {
  const url = `${backendUrl}/store/products?category_id=${categoryId}&fields=id&limit=100`;
  const res = await fetch(url, {
    headers: { "x-publishable-api-key": publishableKey },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products for category: ${res.status}`);
  }

  const data = (await res.json()) as { products: { id: string }[] };
  return data.products.map((p) => p.id);
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: -
async function syncProducts() {
  // Fetch all regions
  console.log("Fetching regions...");
  const regions = await fetchRegions();
  console.log(
    `Found ${regions.length} regions: ${regions.map((r) => r.name).join(", ")}`
  );

  // Fetch products for first region to get base product data
  const firstRegion = regions[0];
  console.log(`Fetching products with pricing for ${firstRegion.name}...`);
  const baseProducts = await fetchAllProducts(firstRegion.id);
  console.log(`Fetched ${baseProducts.length} products`);

  // Build variant prices map: variantId -> regionId -> price
  const variantPrices: Record<string, Record<string, VariantPrice>> = {};

  // Add prices from first region
  for (const product of baseProducts) {
    for (const variant of product.variants ?? []) {
      if (!variantPrices[variant.id]) {
        variantPrices[variant.id] = {};
      }
      if (variant.calculated_price) {
        variantPrices[variant.id][firstRegion.id] = {
          calculated_amount: variant.calculated_price.calculated_amount,
          original_amount: variant.calculated_price.original_amount,
          currency_code: variant.calculated_price.currency_code,
        };
      }
    }
  }

  // Fetch prices from other regions
  for (const region of regions.slice(1)) {
    console.log(`Fetching prices for ${region.name}...`);
    const regionProducts = await fetchAllProducts(region.id);

    for (const product of regionProducts) {
      for (const variant of product.variants ?? []) {
        if (!variantPrices[variant.id]) {
          variantPrices[variant.id] = {};
        }
        if (variant.calculated_price) {
          variantPrices[variant.id][region.id] = {
            calculated_amount: variant.calculated_price.calculated_amount,
            original_amount: variant.calculated_price.original_amount,
            currency_code: variant.calculated_price.currency_code,
          };
        }
      }
    }
  }

  // Fetch categories and build product→category mapping
  console.log("Fetching categories...");
  const categories = await fetchCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const productCategoryIds: Record<string, string[]> = {};

  for (const category of categories) {
    const productIds = await fetchProductsInCategory(category.id);
    for (const productId of productIds) {
      if (!productCategoryIds[productId]) {
        productCategoryIds[productId] = [];
      }
      productCategoryIds[productId].push(category.id);
    }
  }
  console.log(
    `Mapped ${Object.keys(productCategoryIds).length} products to categories`
  );

  // Build search products
  const products: SearchProduct[] = baseProducts.map((product) => {
    const catIds = productCategoryIds[product.id] ?? [];

    const variants: SearchVariant[] = (product.variants ?? []).map((v) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      prices: variantPrices[v.id] ?? {},
    }));

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description ?? "",
      thumbnail: product.thumbnail ?? "",
      collection_id: product.collection_id ?? "",
      collection: product.collection?.title ?? "",
      category_ids: catIds,
      categories: catIds.map((id) => categoryMap.get(id) ?? ""),
      type: product.type ?? null,
      variants,
    };
  });

  // Fetch all collections
  console.log("Fetching collections...");
  const collections = await fetchCollections();

  // Write products
  const productsPath = resolve(import.meta.dirname, "../data/products.json");
  writeFileSync(productsPath, JSON.stringify(products, null, 2));
  console.log(`Wrote ${products.length} products to ${productsPath}`);

  // Write metadata (all possible facet values + regions)
  const metadata = {
    collections: Object.fromEntries(collections.map((c) => [c.id, c.title])),
    categories: Object.fromEntries(categories.map((c) => [c.id, c.name])),
    regions: Object.fromEntries(
      regions.map((r) => [
        r.id,
        { name: r.name, currency_code: r.currency_code },
      ])
    ),
  };
  const metadataPath = resolve(import.meta.dirname, "../data/metadata.json");
  writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`Wrote metadata to ${metadataPath}`);
}

syncProducts().catch(console.error);
