import { User, Product, Category, Condition } from '@/types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Emma Green',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    location: 'Brooklyn, NY',
    joinedDate: '2023-06-15',
    bio: 'Sustainability enthusiast. Love giving items a second life!'
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    email: 'marcus@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    joinedDate: '2023-08-20',
    bio: 'Vintage collector and upcycling hobbyist.'
  },
  {
    id: 'user-3',
    name: 'Sofia Martinez',
    email: 'sofia@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    location: 'Austin, TX',
    joinedDate: '2024-01-10',
    bio: 'Mom of 2, decluttering expert.'
  },
  {
    id: 'user-4',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    location: 'Portland, OR',
    joinedDate: '2023-11-05',
    bio: 'Furniture restoration is my passion.'
  }
];

export const products: Product[] = [
  {
    id: 'prod-1',
    title: 'Mid-Century Modern Armchair',
    description: 'Beautiful restored mid-century armchair with new upholstery in sage green velvet. Original wood frame in excellent condition. Perfect for any living room.',
    price: 285,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop'
    ],
    category: 'furniture',
    condition: 'like-new',
    location: 'Brooklyn, NY',
    distance: 2.5,
    sellerId: 'user-1',
    createdAt: '2024-11-20',
    isAvailable: true,
    isUpcycled: true
  },
  {
    id: 'prod-2',
    title: 'Vintage Denim Jacket - Size M',
    description: 'Classic 90s Levi\'s denim jacket. Some natural fading that adds character. All buttons intact, no tears.',
    price: 65,
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop'
    ],
    category: 'clothing',
    condition: 'good',
    location: 'San Francisco, CA',
    distance: 15,
    sellerId: 'user-2',
    createdAt: '2024-11-18',
    isAvailable: true,
    isUpcycled: false
  },
  {
    id: 'prod-3',
    title: 'Upcycled Pallet Coffee Table',
    description: 'Handcrafted coffee table made from reclaimed shipping pallets. Sanded smooth, sealed with natural beeswax. Dimensions: 48"x24"x18"',
    price: 175,
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=600&fit=crop'
    ],
    category: 'furniture',
    condition: 'new',
    location: 'Portland, OR',
    distance: 8,
    sellerId: 'user-4',
    createdAt: '2024-11-22',
    isAvailable: true,
    isUpcycled: true
  },
  {
    id: 'prod-4',
    title: 'Sony Noise-Canceling Headphones',
    description: 'Sony WH-1000XM4 wireless headphones. Excellent condition, includes original case and cables. Battery still holds full charge.',
    price: 180,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop'
    ],
    category: 'electronics',
    condition: 'like-new',
    location: 'Austin, TX',
    distance: 5,
    sellerId: 'user-3',
    createdAt: '2024-11-15',
    isAvailable: true,
    isUpcycled: false
  },
  {
    id: 'prod-5',
    title: 'Handmade Macrame Wall Hanging',
    description: 'Beautiful bohemian macrame made from natural cotton cord. Created from recycled textile materials. 24" wide x 36" long.',
    price: 45,
    images: [
      'https://images.unsplash.com/photo-1622464689583-a09e88f0d34e?w=600&h=600&fit=crop'
    ],
    category: 'home-decor',
    condition: 'new',
    location: 'Brooklyn, NY',
    distance: 3,
    sellerId: 'user-1',
    createdAt: '2024-11-21',
    isAvailable: true,
    isUpcycled: true
  },
  {
    id: 'prod-6',
    title: 'Complete Harry Potter Book Set',
    description: 'All 7 Harry Potter books, hardcover editions. Some shelf wear but pages in great condition. Perfect for collectors.',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop'
    ],
    category: 'books',
    condition: 'good',
    location: 'San Francisco, CA',
    distance: 12,
    sellerId: 'user-2',
    createdAt: '2024-11-10',
    isAvailable: true,
    isUpcycled: false
  },
  {
    id: 'prod-7',
    title: 'Yoga Mat & Blocks Set',
    description: 'Lululemon yoga mat with two cork blocks. Mat has light use marks. Blocks are in perfect condition.',
    price: 55,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop'
    ],
    category: 'sports',
    condition: 'good',
    location: 'Austin, TX',
    distance: 4,
    sellerId: 'user-3',
    createdAt: '2024-11-19',
    isAvailable: true,
    isUpcycled: false
  },
  {
    id: 'prod-8',
    title: 'Vintage Brass Floor Lamp',
    description: 'Stunning 1970s brass floor lamp with original shade. Rewired for safety. A true statement piece.',
    price: 125,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop'
    ],
    category: 'home-decor',
    condition: 'like-new',
    location: 'Portland, OR',
    distance: 7,
    sellerId: 'user-4',
    createdAt: '2024-11-17',
    isAvailable: true,
    isUpcycled: true
  },
  {
    id: 'prod-9',
    title: 'Kids Wooden Train Set',
    description: 'BRIO compatible wooden train set with 50+ pieces. Some paint wear on tracks but fully functional.',
    price: 35,
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=600&fit=crop'
    ],
    category: 'toys',
    condition: 'fair',
    location: 'Austin, TX',
    distance: 6,
    sellerId: 'user-3',
    createdAt: '2024-11-14',
    isAvailable: true,
    isUpcycled: false
  },
  {
    id: 'prod-10',
    title: 'Reclaimed Wood Bookshelf',
    description: 'Custom-built bookshelf using reclaimed barn wood and industrial pipes. 6 feet tall, 4 shelves. A conversation starter!',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=600&fit=crop'
    ],
    category: 'furniture',
    condition: 'new',
    location: 'Portland, OR',
    distance: 9,
    sellerId: 'user-4',
    createdAt: '2024-11-23',
    isAvailable: true,
    isUpcycled: true
  }
];

export const categories: { value: Category; label: string; icon: string }[] = [
  { value: 'furniture', label: 'Furniture', icon: 'Armchair' },
  { value: 'clothing', label: 'Clothing', icon: 'Shirt' },
  { value: 'electronics', label: 'Electronics', icon: 'Smartphone' },
  { value: 'home-decor', label: 'Home Decor', icon: 'Lamp' },
  { value: 'books', label: 'Books', icon: 'BookOpen' },
  { value: 'sports', label: 'Sports', icon: 'Dumbbell' },
  { value: 'toys', label: 'Toys', icon: 'Gamepad2' },
  { value: 'other', label: 'Other', icon: 'Package' }
];

export const conditions: { value: Condition; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'worn', label: 'Worn' }
];
