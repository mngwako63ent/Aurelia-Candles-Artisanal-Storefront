export type ProductCategory = 'all' | 'soy-candles' | 'reed-diffusers' | 'linen-sprays' | 'wax-melts' | 'gift-sets' | 'seasonal';

export interface ScentPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface WholesaleTier {
  minUnits: number;
  pricePerUnit: number;
  discountPercentage: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'soy-candles' | 'reed-diffusers' | 'wax-melts' | 'linen-sprays' | 'gift-sets' | 'seasonal';
  categoryLabel: string;
  retailPrice: number;
  wholesalePrice: number;
  wholesaleTiers: WholesaleTier[];
  moq: number; // minimum wholesale units
  casePack: number; // units per master carton
  burnTime: string;
  weight: string;
  vessel: string;
  waxType: string;
  wick: string;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  images?: string[];
  scentPyramid: ScentPyramid;
  description: string;
  sku: string;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  isWholesale?: boolean;
  unitPrice: number;
}

export type ViewMode = 'retail' | 'reseller';

export interface WholesaleApplication {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  taxId: string;
  website: string;
  storeLocation: string;
  projectedVolume: string;
  comments: string;
}
