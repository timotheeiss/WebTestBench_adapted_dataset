export type Category = 'tech' | 'home' | 'fitness';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  tags: string[];
  price: number;
  rating: number;
  shortDescription: string;
  fullReview: string;
  specs: { label: string; value: string }[];
  imageUrl: string;
  affiliateLink: string;
  featured: boolean;
  createdAt: string;
}

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    category: 'tech',
    tags: ['headphones', 'wireless', 'noise-cancelling', 'premium'],
    price: 399,
    rating: 4.8,
    shortDescription: 'Industry-leading noise cancellation with exceptional sound quality and all-day comfort.',
    fullReview: 'The Sony WH-1000XM5 represents the pinnacle of wireless noise-cancelling headphones. With its new 30mm driver units and improved noise-cancelling processor, these headphones deliver an audio experience that\'s hard to match. The comfort level is exceptional thanks to the soft-fit leather and lighter design. Battery life of 30 hours means you can go days between charges. The multipoint connection allows you to switch seamlessly between devices.',
    specs: [
      { label: 'Driver Size', value: '30mm' },
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Weight', value: '250g' },
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Noise Cancelling', value: 'Yes, Adaptive' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/sony-xm5',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Peloton Bike+',
    slug: 'peloton-bike-plus',
    category: 'fitness',
    tags: ['cardio', 'cycling', 'smart-equipment', 'subscription'],
    price: 2495,
    rating: 4.6,
    shortDescription: 'Premium connected fitness bike with rotating HD touchscreen and world-class instructors.',
    fullReview: 'The Peloton Bike+ takes at-home cycling to another level. The 23.8" rotating HD touchscreen allows you to pivot for off-bike workouts like strength and yoga. Auto-Follow technology adjusts your resistance automatically during classes. The speakers have been upgraded for immersive sound, and Apple GymKit integration makes syncing your Apple Watch seamless. While the price is premium, the quality and content library justify the investment for serious cyclists.',
    specs: [
      { label: 'Screen', value: '23.8" HD Touchscreen' },
      { label: 'Resistance Levels', value: '100' },
      { label: 'Dimensions', value: '59"L x 22"W x 59"H' },
      { label: 'Weight Capacity', value: '297 lbs' },
      { label: 'Subscription', value: 'Required ($44/mo)' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/peloton',
    featured: true,
    createdAt: '2024-02-10',
  },
  {
    id: '3',
    name: 'Dyson V15 Detect',
    slug: 'dyson-v15-detect',
    category: 'home',
    tags: ['vacuum', 'cordless', 'smart-home', 'cleaning'],
    price: 749,
    rating: 4.7,
    shortDescription: 'Intelligent cordless vacuum with laser dust detection and real-time particle counting.',
    fullReview: 'The Dyson V15 Detect is a marvel of engineering. Its green laser illuminates microscopic dust that would otherwise be invisible, making it impossible to miss any debris. The LCD screen provides real-time scientific proof of what you\'re picking up, categorized by particle size. With up to 60 minutes of runtime and powerful suction that automatically adjusts based on floor type, this vacuum makes cleaning almost enjoyable.',
    specs: [
      { label: 'Runtime', value: 'Up to 60 minutes' },
      { label: 'Bin Volume', value: '0.76L' },
      { label: 'Weight', value: '6.8 lbs' },
      { label: 'Suction Power', value: '240 AW' },
      { label: 'Filtration', value: 'HEPA' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/dyson-v15',
    featured: true,
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Apple MacBook Pro 14"',
    slug: 'macbook-pro-14',
    category: 'tech',
    tags: ['laptop', 'apple', 'professional', 'portable'],
    price: 1999,
    rating: 4.9,
    shortDescription: 'Pro-level performance with M3 Pro chip, stunning Liquid Retina XDR display.',
    fullReview: 'The MacBook Pro 14" with M3 Pro chip is simply the best laptop for professionals. The performance leap is staggering—video editing, 3D rendering, and software development feel effortless. The Liquid Retina XDR display with 1000 nits sustained brightness is gorgeous for any content. Battery life of up to 17 hours means you can leave the charger at home. The return of MagSafe, HDMI, and SD card slot make this the most versatile MacBook ever.',
    specs: [
      { label: 'Chip', value: 'Apple M3 Pro' },
      { label: 'Memory', value: '18GB Unified' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '14.2" Liquid Retina XDR' },
      { label: 'Battery', value: 'Up to 17 hours' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/macbook-pro',
    featured: false,
    createdAt: '2024-03-01',
  },
  {
    id: '5',
    name: 'Theragun Pro',
    slug: 'theragun-pro',
    category: 'fitness',
    tags: ['recovery', 'massage', 'muscle', 'therapy'],
    price: 599,
    rating: 4.5,
    shortDescription: 'Professional-grade percussive therapy device for deep muscle treatment and faster recovery.',
    fullReview: 'The Theragun Pro is the gold standard in percussive therapy. With a stall force of 60 lbs and amplitude of 16mm, it reaches 60% deeper into muscle than average massagers. The OLED screen and app connectivity allow for personalized routines. The rotating arm and ergonomic grip make it easy to reach any muscle group. Whether you\'re an athlete or desk worker, this device will transform your recovery routine.',
    specs: [
      { label: 'Stall Force', value: '60 lbs' },
      { label: 'Amplitude', value: '16mm' },
      { label: 'Speed Range', value: '1750-2400 PPM' },
      { label: 'Battery Life', value: '150 minutes' },
      { label: 'Attachments', value: '6 included' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/theragun',
    featured: false,
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    name: 'Philips Hue Starter Kit',
    slug: 'philips-hue-starter-kit',
    category: 'home',
    tags: ['lighting', 'smart-home', 'ambiance', 'automation'],
    price: 199,
    rating: 4.4,
    shortDescription: 'Transform your home lighting with millions of colors and smart automation.',
    fullReview: 'The Philips Hue ecosystem is the most mature and reliable smart lighting system available. This starter kit includes the essential Bridge and three color bulbs to get you started. The app offers incredible control over color temperature, brightness, and scenes. Integration with every major smart home platform means you can control lights with voice, automations, or your phone. The initial investment pays off with the expandability and reliability.',
    specs: [
      { label: 'Bulbs Included', value: '3 Color Bulbs' },
      { label: 'Lumens', value: '800 per bulb' },
      { label: 'Color Range', value: '16 million colors' },
      { label: 'Hub', value: 'Bridge included' },
      { label: 'Compatibility', value: 'Alexa, Google, HomeKit' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/philips-hue',
    featured: false,
    createdAt: '2024-01-25',
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'tech',
    tags: ['smartphone', 'android', 'camera', 'flagship'],
    price: 1299,
    rating: 4.7,
    shortDescription: 'The ultimate Android phone with Galaxy AI, S Pen, and a stunning 200MP camera.',
    fullReview: 'Samsung\'s Galaxy S24 Ultra is a powerhouse that pushes smartphone boundaries. Galaxy AI features like Circle to Search, Live Translate, and Generative Edit are genuinely useful daily. The 200MP main camera produces incredibly detailed photos, while the 5x and 3x telephoto lenses cover all zoom ranges. The titanium frame and flattened display make it more comfortable to hold than predecessors. Battery life easily lasts a full day of heavy use.',
    specs: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { label: 'Camera', value: '200MP + 12MP + 50MP + 10MP' },
      { label: 'Battery', value: '5000 mAh' },
      { label: 'Storage', value: '256GB/512GB/1TB' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/s24-ultra',
    featured: false,
    createdAt: '2024-03-10',
  },
  {
    id: '8',
    name: 'Bowflex SelectTech 552',
    slug: 'bowflex-selecttech-552',
    category: 'fitness',
    tags: ['weights', 'dumbbells', 'strength', 'home-gym'],
    price: 549,
    rating: 4.6,
    shortDescription: 'Adjustable dumbbells that replace 15 sets of weights with a simple dial system.',
    fullReview: 'The Bowflex SelectTech 552 dumbbells are a home gym essential. The dial system lets you adjust weight from 5 to 52.5 pounds in 2.5-pound increments—replacing 15 pairs of dumbbells. The transition between weights takes just seconds, keeping rest periods short. Build quality is solid, and they\'ve held up well over years of use. If you\'re short on space but want a complete strength training setup, these are unbeatable.',
    specs: [
      { label: 'Weight Range', value: '5-52.5 lbs each' },
      { label: 'Increments', value: '2.5 lbs' },
      { label: 'Dimensions', value: '15.75" x 8" x 9"' },
      { label: 'Sets Replaced', value: '15' },
      { label: 'Warranty', value: '2 years' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/bowflex',
    featured: false,
    createdAt: '2024-02-20',
  },
  {
    id: '9',
    name: 'Breville Barista Express',
    slug: 'breville-barista-express',
    category: 'home',
    tags: ['coffee', 'espresso', 'kitchen', 'appliance'],
    price: 699,
    rating: 4.5,
    shortDescription: 'Cafe-quality espresso at home with integrated grinder and professional steam wand.',
    fullReview: 'The Breville Barista Express is the perfect entry point to serious home espresso. The integrated conical burr grinder ensures fresh grounds for every shot. The 15-bar Italian pump and precise temperature control produce excellent espresso. The steam wand takes practice but can produce café-quality microfoam for latte art. It\'s a learning curve, but the journey to mastering espresso is rewarding and this machine makes it accessible.',
    specs: [
      { label: 'Pump Pressure', value: '15 bar' },
      { label: 'Grinder', value: 'Conical Burr' },
      { label: 'Water Tank', value: '67 oz' },
      { label: 'Dimensions', value: '13.25"W x 12.5"D x 15.75"H' },
      { label: 'Grind Settings', value: '18' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    affiliateLink: 'https://example.com/breville',
    featured: false,
    createdAt: '2024-01-30',
  },
];

export const categories: { id: Category; name: string; description: string }[] = [
  { id: 'tech', name: 'Tech Gadgets', description: 'The latest in consumer electronics and technology' },
  { id: 'home', name: 'Home Goods', description: 'Smart home devices, appliances, and household essentials' },
  { id: 'fitness', name: 'Fitness', description: 'Equipment and gear for your health and fitness journey' },
];

export const allTags = Array.from(
  new Set(initialProducts.flatMap((p) => p.tags))
).sort();
