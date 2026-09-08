import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Transaction, 
  Category, 
  Account,
  defaultTransactions, 
  defaultCategories, 
  defaultAccounts 
} from '@/data/mockData';

interface BookkeepingContextType {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;
}

const BookkeepingContext = createContext<BookkeepingContextType | undefined>(undefined);

export function BookkeepingProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [accounts] = useState<Account[]>(defaultAccounts);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(tx => (tx.id === id ? { ...tx, ...updates } : tx))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  return (
    <BookkeepingContext.Provider
      value={{
        transactions,
        categories,
        accounts,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
      }}
    >
      {children}
    </BookkeepingContext.Provider>
  );
}

export function useBookkeeping() {
  const context = useContext(BookkeepingContext);
  if (context === undefined) {
    throw new Error('useBookkeeping must be used within a BookkeepingProvider');
  }
  return context;
}
