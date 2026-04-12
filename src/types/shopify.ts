/* ═══════════════════════════════════════════════════════════════════
   Shopify Types
   Mirrors the Storefront API GraphQL schema for type safety.
   ═══════════════════════════════════════════════════════════════════ */

export type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  selectedOptions: SelectedOption[];
  image: ShopifyImage | null;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string | null;
    description: string | null;
  };
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  featuredImage: ShopifyImage | null;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
  options: ProductOption[];
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: MoneyV2;
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: MoneyV2;
    selectedOptions: SelectedOption[];
    image: ShopifyImage | null;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: MoneyV2;
    subtotalAmount: MoneyV2;
    totalTaxAmount: MoneyV2 | null;
  };
  lines: {
    edges: Array<{ node: CartLine }>;
  };
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type ProductConnection = {
  pageInfo: PageInfo;
  edges: Array<{ node: Product }>;
};

export type CollectionConnection = {
  edges: Array<{ node: Collection }>;
};
