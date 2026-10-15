import { Product } from '../types';

export const HERO_IMAGE = '/images/hero_candle.jpg';
export const AMBER_CANDLE_IMAGE = '/images/product_amber_candle.jpg';
export const CERAMIC_CANDLE_IMAGE = '/images/product_ceramic_candle.jpg';
export const WAX_MELTS_IMAGE = '/images/product_wax_melts.jpg';
export const GIFT_SET_IMAGE = '/images/product_gift_set.jpg';
export const LINEN_SPRAY_IMAGE_1 = '/images/linen_spray_1.jpeg';
export const LINEN_SPRAY_IMAGE_2 = '/images/linen_spray_2.jpeg';
export const REED_DIFFUSER_IMAGE_1 = '/images/reed_diffuser_oud_1.jpeg';
export const REED_DIFFUSER_IMAGE_2 = '/images/reed_diffuser_oud_2.jpeg';

export const formatZAR = (amount: number): string => {
  return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const PRODUCTS: Product[] = [
  {
    id: 'santal-amber-no14',
    name: 'Santal & Amber Cashmere',
    tagline: 'Warm golden resins, sun-cured sandalwood, and creamy cashmere wool.',
    category: 'soy-candles',
    categoryLabel: 'Soy Candle',
    retailPrice: 380.00,
    wholesalePrice: 190.00,
    wholesaleTiers: [
      { minUnits: 12, pricePerUnit: 190.00, discountPercentage: 50 },
      { minUnits: 48, pricePerUnit: 170.00, discountPercentage: 55 },
      { minUnits: 120, pricePerUnit: 150.00, discountPercentage: 60 }
    ],
    moq: 6,
    casePack: 6,
    burnTime: '55–60 Hours',
    weight: '240g / 8.5 oz',
    vessel: 'Amber Glass Jar',
    waxType: '100% Organic Soy Wax',
    wick: 'Braided Cotton Wick',
    rating: 4.9,
    reviewCount: 142,
    stock: 84,
    image: AMBER_CANDLE_IMAGE,
    scentPyramid: {
      top: ['Cardamom Pod', 'Bergamot Zest', 'Crisp Cypress'],
      heart: ['Cashmere Wood', 'Smoked Violet', 'Papyrus'],
      base: ['Golden Amber', 'Mysore Sandalwood', 'Cedar Resin']
    },
    description: 'Our signature aroma. Hand-poured in heavy amber glass, Santal & Amber envelops living spaces in velvety warmth, evoking cozy afternoons in a sun-drenched library.',
    sku: 'AUR-SNT-08A',
    isBestSeller: true
  },
  {
    id: 'fluted-alabaster-cedar',
    name: 'Elysian Alabaster & Hinoki',
    tagline: 'Japanese cypress, crisp morning mist, and white stone tea.',
    category: 'soy-candles',
    categoryLabel: 'Sculptural Ceramic',
    retailPrice: 490.00,
    wholesalePrice: 245.00,
    wholesaleTiers: [
      { minUnits: 6, pricePerUnit: 245.00, discountPercentage: 50 },
      { minUnits: 24, pricePerUnit: 220.00, discountPercentage: 55 },
      { minUnits: 60, pricePerUnit: 195.00, discountPercentage: 60 }
    ],
    moq: 6,
    casePack: 6,
    burnTime: '65–70 Hours',
    weight: '310g / 11 oz',
    vessel: 'Fluted Matte Cream Ceramic',
    waxType: 'Botanical Soy Wax Blend',
    wick: 'Crackling Natural Wood Wick',
    rating: 5.0,
    reviewCount: 98,
    stock: 45,
    image: CERAMIC_CANDLE_IMAGE,
    scentPyramid: {
      top: ['Yuzu Rind', 'Crushed Juniper', 'Morning Mist'],
      heart: ['Hinoki Wood', 'Smoked Vetiver', 'White Camellia'],
      base: ['Warm Frankincense', 'Aged Cedar', 'Mineral Stone']
    },
    description: 'Housed in an organic fluted ceramic vessel with a crackling wooden wick that mimics the peaceful cadence of an open hearth.',
    sku: 'AUR-ELY-11C',
    isBestSeller: true,
    isNew: true
  },
  {
    id: 'botanical-herbarium-melts',
    name: 'Wildflower & Lavender Melts',
    tagline: 'Botanical snap blocks with dried lavender sprigs and calendula petals.',
    category: 'wax-melts',
    categoryLabel: 'Wax Melts',
    retailPrice: 180.00,
    wholesalePrice: 90.00,
    wholesaleTiers: [
      { minUnits: 10, pricePerUnit: 90.00, discountPercentage: 50 },
      { minUnits: 30, pricePerUnit: 80.00, discountPercentage: 55 },
      { minUnits: 80, pricePerUnit: 70.00, discountPercentage: 61 }
    ],
    moq: 10,
    casePack: 10,
    burnTime: '75+ Hours Total',
    weight: '170g (6 Large Cubes)',
    vessel: 'Botanical Gift Box',
    waxType: '100% Clean Soy Wax & Botanicals',
    wick: 'Wickless (For Wax Warmers)',
    rating: 4.8,
    reviewCount: 86,
    stock: 120,
    image: WAX_MELTS_IMAGE,
    scentPyramid: {
      top: ['Lavender Blossom', 'Wild Mint Leaves', 'Bergamot'],
      heart: ['Chamomile', 'Dried Calendula', 'Clary Sage'],
      base: ['White Oakmoss', 'Tonka Bean', 'Gentle Vanilla']
    },
    description: 'Designed for gentle flame-free scent diffusion. Hand-pressed with real organic lavender and chamomile petals for tea light or electric wax warmers.',
    sku: 'AUR-MELT-LAV',
    isBestSeller: false
  },
  {
    id: 'linen-spray-100ml',
    name: '100 ml Linen Spray',
    tagline: 'Refreshing botanical mist for bed linens, upholstery, and sacred spaces.',
    category: 'linen-sprays',
    categoryLabel: 'Linen Spray',
    retailPrice: 200.00,
    wholesalePrice: 100.00,
    wholesaleTiers: [
      { minUnits: 6, pricePerUnit: 100.00, discountPercentage: 50 },
      { minUnits: 24, pricePerUnit: 90.00, discountPercentage: 55 },
      { minUnits: 60, pricePerUnit: 80.00, discountPercentage: 60 }
    ],
    moq: 6,
    casePack: 6,
    burnTime: '500+ Fine Sprays',
    weight: '100 ml / 3.4 fl oz',
    vessel: 'Amber Glass Spray Bottle',
    waxType: 'Natural Botanical Distillate & Essential Oils',
    wick: 'Fine Mist Atomizer',
    rating: 4.95,
    reviewCount: 48,
    stock: 95,
    image: LINEN_SPRAY_IMAGE_1,
    images: [LINEN_SPRAY_IMAGE_1, LINEN_SPRAY_IMAGE_2],
    scentPyramid: {
      top: ['Calming French Lavender', 'Fresh Bergamot', 'Morning Dew'],
      heart: ['White Camellia', 'English Chamomile', 'Violet Leaf'],
      base: ['Clean Amber', 'Soft White Cedar', 'Gentle Vanilla']
    },
    description: 'Our handcrafted 100 ml Linen Spray infuses your pillows, bedsheets, curtains, and living areas with a soothing, long-lasting botanical aura. Gentle on fine fabrics and formulated with pure fragrance distillates.',
    sku: 'AUR-LIN-100',
    isBestSeller: true,
    isNew: true
  },
  {
    id: 'timeless-oud-diffuser-100ml',
    name: 'Timeless OUD 100ml Reed Diffuser',
    tagline: 'Deep agarwood oud, smoked rosewood, and amber resin in an elegant glass diffuser.',
    category: 'reed-diffusers',
    categoryLabel: 'Reed Diffuser',
    retailPrice: 230.00,
    wholesalePrice: 115.00,
    wholesaleTiers: [
      { minUnits: 6, pricePerUnit: 115.00, discountPercentage: 50 },
      { minUnits: 24, pricePerUnit: 103.50, discountPercentage: 55 },
      { minUnits: 60, pricePerUnit: 92.00, discountPercentage: 60 }
    ],
    moq: 6,
    casePack: 6,
    burnTime: '3–4 Months Diffusion',
    weight: '100 ml / 3.4 fl oz',
    vessel: 'Glass Bottle with 8 Natural Reeds',
    waxType: 'Alcohol-Free Botanical Diffuser Base',
    wick: '8 Natural High-Absorbency Reeds',
    rating: 4.98,
    reviewCount: 39,
    stock: 80,
    image: REED_DIFFUSER_IMAGE_1,
    images: [REED_DIFFUSER_IMAGE_1, REED_DIFFUSER_IMAGE_2],
    scentPyramid: {
      top: ['Rich Dark Oud', 'Bergamot Zest', 'Cardamom'],
      heart: ['Smoked Damask Rose', 'Leather Accord', 'Aged Cedar'],
      base: ['Golden Amber', 'Mysore Sandalwood', 'Tonka Bean']
    },
    description: 'Immerse your space in the luxurious, enduring warmth of Timeless OUD. Formulated with high-concentration fine fragrance oils and natural diffuser reeds to provide flameless, continuous luxury fragrance for months.',
    sku: 'AUR-OUD-100',
    isBestSeller: true,
    isNew: true
  },
  {
    id: 'artisanal-discovery-trio',
    name: 'Atelier Discovery Trio Gift Set',
    tagline: 'Three curated 100g amber jars in an embossed botanical gift box.',
    category: 'gift-sets',
    categoryLabel: 'Luxury Gift Set',
    retailPrice: 750.00,
    wholesalePrice: 375.00,
    wholesaleTiers: [
      { minUnits: 4, pricePerUnit: 375.00, discountPercentage: 50 },
      { minUnits: 16, pricePerUnit: 340.00, discountPercentage: 55 },
      { minUnits: 40, pricePerUnit: 300.00, discountPercentage: 60 }
    ],
    moq: 4,
    casePack: 4,
    burnTime: '90 Hours Combined',
    weight: '3 x 100g (300g Total)',
    vessel: 'Gold-Embossed Presentation Box',
    waxType: '100% Organic Soy Wax',
    wick: 'Braided Pure Cotton Wicks',
    rating: 4.95,
    reviewCount: 164,
    stock: 38,
    image: GIFT_SET_IMAGE,
    scentPyramid: {
      top: ['Bergamot & Cedar', 'Sandalwood & Amber', 'Eucalyptus & Moss'],
      heart: ['Pine Cones', 'Rosemary Leaves', 'Cashmere Accord'],
      base: ['Bourbon Vanilla', 'Smoked Vetiver', 'Amber']
    },
    description: 'The definitive introduction to the Aurelia collection. Includes three curated miniature candles: Sandalwood & Amber, Bergamot & Cedar, and Eucalyptus & Moss.',
    sku: 'AUR-TRIO-04G',
    isBestSeller: true
  },
  {
    id: 'bergamot-smoked-fig',
    name: 'Golden Bergamot & Wild Fig',
    tagline: 'Sun-drenched citrus, dark fig leaves, and earthy patchouli.',
    category: 'soy-candles',
    categoryLabel: 'Soy Candle',
    retailPrice: 380.00,
    wholesalePrice: 190.00,
    wholesaleTiers: [
      { minUnits: 6, pricePerUnit: 190.00, discountPercentage: 50 },
      { minUnits: 24, pricePerUnit: 170.00, discountPercentage: 55 },
      { minUnits: 60, pricePerUnit: 150.00, discountPercentage: 60 }
    ],
    moq: 6,
    casePack: 6,
    burnTime: '55–60 Hours',
    weight: '240g / 8.5 oz',
    vessel: 'Amber Glass Jar',
    waxType: '100% Organic Soy Wax',
    wick: 'Braided Cotton Wick',
    rating: 4.85,
    reviewCount: 76,
    stock: 62,
    image: AMBER_CANDLE_IMAGE,
    scentPyramid: {
      top: ['Calabrian Bergamot', 'Crisp Green Apple', 'Grapefruit'],
      heart: ['Adriatic Fig Leaf', 'Orange Blossom', 'Night Jasmine'],
      base: ['Earthy Patchouli', 'Cedar Bark', 'Velveteen Musk']
    },
    description: 'An uplifting, sunny scent capturing golden hour. Sweet sun-ripened fig balanced with fresh citrus and grounding cedar.',
    sku: 'AUR-FIG-08A',
    isBestSeller: false
  },
  {
    id: 'spiced-cardamom-bourbon',
    name: 'Spiced Cardamom & Smoked Bourbon',
    tagline: 'Roasted tonka, warm oak wood, and Ceylon spices.',
    category: 'seasonal',
    categoryLabel: 'Seasonal Reserve',
    retailPrice: 420.00,
    wholesalePrice: 210.00,
    wholesaleTiers: [
      { minUnits: 6, pricePerUnit: 210.00, discountPercentage: 50 },
      { minUnits: 24, pricePerUnit: 190.00, discountPercentage: 55 },
      { minUnits: 60, pricePerUnit: 170.00, discountPercentage: 60 }
    ],
    moq: 6,
    casePack: 6,
    burnTime: '55–60 Hours',
    weight: '240g / 8.5 oz',
    vessel: 'Frosted Smoke Glass',
    waxType: 'Organic Soy Wax Blend',
    wick: 'Dual Cotton Braided Wicks',
    rating: 4.92,
    reviewCount: 110,
    stock: 29,
    image: HERO_IMAGE,
    scentPyramid: {
      top: ['Cracked Pepper', 'Green Cardamom', 'Nutmeg'],
      heart: ['Bourbon Cask', 'Tonka Bean', 'Tobacco Leaf'],
      base: ['Dark Amber', 'Leather Tannin', 'Vanilla Pod']
    },
    description: 'Crafted for cozy evenings. Wrapped in smoke glass, this blend brings the intimate warmth of crackling fireplaces and fine spices.',
    sku: 'AUR-SEA-08B',
    isBestSeller: false,
    isNew: true
  }
];

export const RESELLER_BENEFITS = [
  {
    title: '50% to 60% Margin',
    description: 'Double your investment with high-margin handcrafted candles.'
  },
  {
    title: 'Low Opening Order (R2,500)',
    description: 'Accessible minimum order quantity to start stocking with minimal risk.'
  },
  {
    title: 'Free Testers with 24+ Units',
    description: 'Receive full-size display testers with qualifying wholesale orders.'
  },
  {
    title: 'Fast Courier Delivery',
    description: 'Door-to-door courier dispatch across South Africa in 2 to 4 business days.'
  }
];

export const FAQS = [
  {
    question: 'Where are Aurelia candles made and what wax do you use?',
    answer: 'All our candles are hand-poured in small batches using 100% natural, biodegradable soy wax. We use lead-free cotton or crackling wooden wicks and premium paraben-free fragrance oils. Zero petroleum paraffin or harmful chemicals.'
  },
  {
    question: 'How does shipping work across South Africa?',
    answer: 'We deliver door-to-door nationwide via reputable couriers (The Courier Guy). Retail orders over R850 qualify for free delivery (standard fee R85). Orders typically arrive in 2–4 business days in major centres (Johannesburg, Pretoria, Cape Town, Durban) and 3–5 days in regional areas.'
  },
  {
    question: 'How do I qualify for wholesale pricing?',
    answer: 'Boutiques, gift shops, spas, and salons can switch to our Reseller Portal. Wholesale orders enjoy 50% to 60% off retail pricing with an opening order minimum of R2,500. You can submit a direct purchase order online.'
  },
  {
    question: 'How do I care for my candle to ensure an even burn?',
    answer: 'On your first burn, allow the melted wax pool to reach the edge of the jar (approx. 2 hours) to prevent tunneling. Always trim the wick to 5mm before lighting.'
  }
];
