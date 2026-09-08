import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, initialProducts, Category } from '@/data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: Category) => Product[];
  getFeaturedProducts: () => Product[];
  searchProducts: (query: string) => Product[];
  filterProducts: (filters: ProductFilters) => Product[];
}

export interface ProductFilters {
  category?: Category | 'all';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  tags?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery?: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (productData: Omit<Product, 'id' | 'slug' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      slug: generateSlug(productData.name),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.name && updates.name !== p.name) {
            updated.slug = generateSlug(updates.name);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductsByCategory = (category: Category) => {
    return products.filter((p) => p.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter((p) => p.featured);
  };

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.shortDescription.toLowerCase().includes(lowerQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  };

  const filterProducts = (filters: ProductFilters) => {
    let result = [...products];

    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter((p) => filters.tags!.some((t) => p.tags.includes(t)));
    }

    if (filters.searchQuery) {
      const lowerQuery = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.shortDescription.toLowerCase().includes(lowerQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return result;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductsByCategory,
        getFeaturedProducts,
        searchProducts,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
