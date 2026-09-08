export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  address: string;
  neighborhood: string;
  description: string;
  image: string;
  availableTimes: string[];
  features: string[];
}

export interface Reservation {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  couponCode?: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  visitDate: string;
}

export interface Coupon {
  code: string;
  discount: number;
  description: string;
  minPartySize?: number;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Fork',
    cuisine: 'French',
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 312,
    address: '142 Grand Avenue',
    neighborhood: 'Downtown',
    description: 'An elegant French dining experience featuring classic techniques with modern flair. Our chef creates seasonal menus that celebrate the finest local ingredients.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    availableTimes: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
    features: ['Private Dining', 'Wine Pairing', 'Tasting Menu'],
  },
  {
    id: '2',
    name: 'Sakura Garden',
    cuisine: 'Japanese',
    priceRange: '$$$',
    rating: 4.6,
    reviewCount: 245,
    address: '88 Cherry Blossom Lane',
    neighborhood: 'Arts District',
    description: 'Authentic Japanese cuisine served in a serene setting. From fresh sushi to traditional kaiseki, experience the art of Japanese gastronomy.',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80',
    availableTimes: ['12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00'],
    features: ['Omakase', 'Sake Bar', 'Tatami Rooms'],
  },
  {
    id: '3',
    name: 'Trattoria Bella',
    cuisine: 'Italian',
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 489,
    address: '56 Olive Street',
    neighborhood: 'Little Italy',
    description: 'Family-owned trattoria serving generations-old recipes. Hand-made pasta, wood-fired pizzas, and an extensive Italian wine selection.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    availableTimes: ['11:30', '12:00', '12:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
    features: ['Wood-Fired Oven', 'Outdoor Seating', 'Family Style'],
  },
  {
    id: '4',
    name: 'Ember & Smoke',
    cuisine: 'American BBQ',
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 567,
    address: '234 Hickory Road',
    neighborhood: 'Warehouse District',
    description: 'Low and slow smoked meats, craft cocktails, and Southern hospitality. Our pitmasters take pride in 16-hour smoked brisket and house-made sauces.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    availableTimes: ['11:00', '11:30', '12:00', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
    features: ['Craft Cocktails', 'Live Music', 'Group Friendly'],
  },
  {
    id: '5',
    name: 'Spice Route',
    cuisine: 'Indian',
    priceRange: '$$',
    rating: 4.4,
    reviewCount: 198,
    address: '77 Curry Lane',
    neighborhood: 'Midtown',
    description: 'A culinary journey through the diverse regions of India. From the tandoor to the tawa, experience authentic flavors and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    availableTimes: ['12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
    features: ['Vegetarian Options', 'Lunch Buffet', 'Catering'],
  },
  {
    id: '6',
    name: 'Ocean Blue',
    cuisine: 'Seafood',
    priceRange: '$$$',
    rating: 4.6,
    reviewCount: 276,
    address: '1 Harbor View',
    neighborhood: 'Waterfront',
    description: 'Fresh catch daily from local fishermen. Oyster bar, lobster specialties, and stunning harbor views make every meal memorable.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    availableTimes: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
    features: ['Waterfront Dining', 'Oyster Bar', 'Sunset Views'],
  },
];

export const coupons: Coupon[] = [
  { code: 'WELCOME10', discount: 10, description: '10% off your first reservation' },
  { code: 'GROUP15', discount: 15, description: '15% off for parties of 6 or more', minPartySize: 6 },
  { code: 'WEEKEND20', discount: 20, description: '20% off weekend dining' },
];

export const initialReviews: Review[] = [
  {
    id: 'r1',
    restaurantId: '1',
    guestName: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely exceptional dining experience. The tasting menu was a journey through flavors I\'ve never experienced before. Worth every penny.',
    date: '2024-01-15',
    visitDate: '2024-01-10',
  },
  {
    id: 'r2',
    restaurantId: '1',
    guestName: 'James L.',
    rating: 4,
    comment: 'Beautiful ambiance and excellent food. The service was attentive without being intrusive. Will definitely return.',
    date: '2024-01-08',
    visitDate: '2024-01-05',
  },
  {
    id: 'r3',
    restaurantId: '2',
    guestName: 'Emily K.',
    rating: 5,
    comment: 'The omakase was incredible. Each piece of sushi was a work of art. The chef\'s attention to detail is unmatched.',
    date: '2024-01-12',
    visitDate: '2024-01-11',
  },
  {
    id: 'r4',
    restaurantId: '3',
    guestName: 'Michael R.',
    rating: 4,
    comment: 'Authentic Italian flavors that remind me of my grandmother\'s cooking. The pasta is made fresh daily and you can taste the difference.',
    date: '2024-01-10',
    visitDate: '2024-01-08',
  },
  {
    id: 'r5',
    restaurantId: '4',
    guestName: 'David W.',
    rating: 5,
    comment: 'Best BBQ in the city, hands down. The brisket melts in your mouth and the sides are perfect. Great beer selection too!',
    date: '2024-01-14',
    visitDate: '2024-01-13',
  },
];
