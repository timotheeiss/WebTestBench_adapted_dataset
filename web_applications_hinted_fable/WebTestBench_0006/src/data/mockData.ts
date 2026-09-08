export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  isTaxRelated: boolean;
  notes?: string;
  reference?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit' | 'cash';
}

export const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Sales Revenue', type: 'income', color: '#22c55e', icon: 'TrendingUp' },
  { id: 'cat-2', name: 'Consulting', type: 'income', color: '#10b981', icon: 'Users' },
  { id: 'cat-3', name: 'Interest Income', type: 'income', color: '#14b8a6', icon: 'Percent' },
  { id: 'cat-4', name: 'Other Income', type: 'income', color: '#06b6d4', icon: 'Plus' },
  { id: 'cat-5', name: 'Office Supplies', type: 'expense', color: '#f59e0b', icon: 'Package' },
  { id: 'cat-6', name: 'Rent', type: 'expense', color: '#ef4444', icon: 'Home' },
  { id: 'cat-7', name: 'Utilities', type: 'expense', color: '#f97316', icon: 'Zap' },
  { id: 'cat-8', name: 'Salaries', type: 'expense', color: '#dc2626', icon: 'Users' },
  { id: 'cat-9', name: 'Marketing', type: 'expense', color: '#e11d48', icon: 'Megaphone' },
  { id: 'cat-10', name: 'Travel', type: 'expense', color: '#be123c', icon: 'Plane' },
  { id: 'cat-11', name: 'Software', type: 'expense', color: '#a855f7', icon: 'Monitor' },
  { id: 'cat-12', name: 'Insurance', type: 'expense', color: '#8b5cf6', icon: 'Shield' },
];

export const defaultTransactions: Transaction[] = [
  {
    id: 'tx-1',
    date: '2024-12-01',
    description: 'Client Project - Website Redesign',
    amount: 5500,
    type: 'income',
    categoryId: 'cat-2',
    isTaxRelated: true,
    reference: 'INV-001',
  },
  {
    id: 'tx-2',
    date: '2024-12-02',
    description: 'Monthly Office Rent',
    amount: 2200,
    type: 'expense',
    categoryId: 'cat-6',
    isTaxRelated: true,
    reference: 'RENT-DEC',
  },
  {
    id: 'tx-3',
    date: '2024-12-03',
    description: 'Product Sales - Q4 Order',
    amount: 8750,
    type: 'income',
    categoryId: 'cat-1',
    isTaxRelated: true,
    reference: 'SO-4521',
  },
  {
    id: 'tx-4',
    date: '2024-12-05',
    description: 'Electric Bill',
    amount: 285,
    type: 'expense',
    categoryId: 'cat-7',
    isTaxRelated: true,
  },
  {
    id: 'tx-5',
    date: '2024-12-06',
    description: 'Team Salaries - December',
    amount: 12500,
    type: 'expense',
    categoryId: 'cat-8',
    isTaxRelated: true,
    reference: 'PAY-DEC-01',
  },
  {
    id: 'tx-6',
    date: '2024-12-08',
    description: 'Consulting Fee - Strategy Session',
    amount: 1800,
    type: 'income',
    categoryId: 'cat-2',
    isTaxRelated: true,
    reference: 'INV-002',
  },
  {
    id: 'tx-7',
    date: '2024-12-10',
    description: 'Office Supplies - Printer Paper & Ink',
    amount: 156,
    type: 'expense',
    categoryId: 'cat-5',
    isTaxRelated: true,
  },
  {
    id: 'tx-8',
    date: '2024-12-12',
    description: 'Google Ads Campaign',
    amount: 850,
    type: 'expense',
    categoryId: 'cat-9',
    isTaxRelated: true,
    reference: 'MKTG-001',
  },
  {
    id: 'tx-9',
    date: '2024-12-14',
    description: 'Bank Interest',
    amount: 42.50,
    type: 'income',
    categoryId: 'cat-3',
    isTaxRelated: true,
  },
  {
    id: 'tx-10',
    date: '2024-12-15',
    description: 'Software Subscription - Adobe CC',
    amount: 54.99,
    type: 'expense',
    categoryId: 'cat-11',
    isTaxRelated: true,
  },
  {
    id: 'tx-11',
    date: '2024-11-01',
    description: 'November Sales Revenue',
    amount: 15200,
    type: 'income',
    categoryId: 'cat-1',
    isTaxRelated: true,
    reference: 'SO-NOV-BATCH',
  },
  {
    id: 'tx-12',
    date: '2024-11-02',
    description: 'Monthly Office Rent',
    amount: 2200,
    type: 'expense',
    categoryId: 'cat-6',
    isTaxRelated: true,
    reference: 'RENT-NOV',
  },
  {
    id: 'tx-13',
    date: '2024-11-10',
    description: 'Business Insurance - Annual',
    amount: 3600,
    type: 'expense',
    categoryId: 'cat-12',
    isTaxRelated: true,
    reference: 'INS-2024',
  },
  {
    id: 'tx-14',
    date: '2024-11-15',
    description: 'Client Retainer Fee',
    amount: 3500,
    type: 'income',
    categoryId: 'cat-2',
    isTaxRelated: true,
    reference: 'RET-NOV',
  },
  {
    id: 'tx-15',
    date: '2024-11-20',
    description: 'Business Trip - Conference',
    amount: 1250,
    type: 'expense',
    categoryId: 'cat-10',
    isTaxRelated: true,
    reference: 'TRIP-001',
  },
  {
    id: 'tx-16',
    date: '2024-10-05',
    description: 'Product Sales - October Batch',
    amount: 12800,
    type: 'income',
    categoryId: 'cat-1',
    isTaxRelated: true,
  },
  {
    id: 'tx-17',
    date: '2024-10-10',
    description: 'Team Salaries - October',
    amount: 12500,
    type: 'expense',
    categoryId: 'cat-8',
    isTaxRelated: true,
  },
  {
    id: 'tx-18',
    date: '2024-10-15',
    description: 'Office Equipment',
    amount: 890,
    type: 'expense',
    categoryId: 'cat-5',
    isTaxRelated: true,
    notes: 'New ergonomic chairs',
  },
];

export const defaultAccounts: Account[] = [
  { id: 'acc-1', name: 'Business Checking', balance: 24580.50, type: 'checking' },
  { id: 'acc-2', name: 'Business Savings', balance: 50000, type: 'savings' },
  { id: 'acc-3', name: 'Petty Cash', balance: 350, type: 'cash' },
];
