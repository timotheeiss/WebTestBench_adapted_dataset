import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, Product, CartItem, PurchaseRequest } from '@/types';
import { users as initialUsers, products as initialProducts } from '@/data/mockData';

interface AppContextType {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, location: string) => boolean;
  logout: () => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'sellerId'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Purchase Requests
  purchaseRequests: PurchaseRequest[];
  sendPurchaseRequest: (productId: string, message: string) => void;
  
  // Users
  getUserById: (id: string) => User | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);

  const login = useCallback((email: string, _password: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, [users]);

  const register = useCallback((name: string, email: string, _password: string, location: string): boolean => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      location,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCart([]);
  }, []);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'createdAt' | 'sellerId'>) => {
    if (!currentUser) return;
    
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      sellerId: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProducts(prev => [newProduct, ...prev]);
  }, [currentUser]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
  }, []);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const getProductsBySeller = useCallback((sellerId: string) => {
    return products.filter(p => p.sellerId === sellerId);
  }, [products]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const sendPurchaseRequest = useCallback((productId: string, message: string) => {
    if (!currentUser) return;
    
    const request: PurchaseRequest = {
      id: `req-${Date.now()}`,
      productId,
      buyerId: currentUser.id,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setPurchaseRequests(prev => [...prev, request]);
  }, [currentUser]);

  const getUserById = useCallback((id: string) => {
    return users.find(u => u.id === id);
  }, [users]);

  return (
    <AppContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      login,
      register,
      logout,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsBySeller,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      purchaseRequests,
      sendPurchaseRequest,
      getUserById
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
