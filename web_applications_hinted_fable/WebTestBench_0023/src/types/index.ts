export type Category = 
  | 'furniture'
  | 'clothing'
  | 'electronics'
  | 'home-decor'
  | 'books'
  | 'sports'
  | 'toys'
  | 'other';

export type Condition = 'new' | 'like-new' | 'good' | 'fair' | 'worn';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinedDate: string;
  bio?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  condition: Condition;
  location: string;
  distance?: number;
  sellerId: string;
  createdAt: string;
  isAvailable: boolean;
  isUpcycled: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PurchaseRequest {
  id: string;
  productId: string;
  buyerId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}
