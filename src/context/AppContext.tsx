'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, Transaction, Reward, ViewMode, Product } from '@/types';
import { mockCustomers, mockTransactions, mockRewards, mockProducts } from '@/data/mockData';

interface AppContextType {
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  rewards: Reward[];
  products: Product[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  awardPoints: (customerId: string, points: number, description: string) => void;
  redeemReward: (customerId: string, reward: Reward) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [rewards] = useState<Reward[]>(mockRewards);
  const [products] = useState<Product[]>(mockProducts);
  const [viewMode, setViewMode] = useState<ViewMode>('customer');

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [...prev, customer]);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const awardPoints = (customerId: string, points: number, description: string) => {
    // Update customer points
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, points: c.points + points } : c
      )
    );

    // Add transaction
    const transaction: Transaction = {
      id: `t${Date.now()}`,
      customerId,
      type: 'earn',
      points,
      description,
      date: new Date().toISOString(),
    };
    addTransaction(transaction);

    // Update current customer if it's them
    if (currentCustomer?.id === customerId) {
      setCurrentCustomer((prev) =>
        prev ? { ...prev, points: prev.points + points } : null
      );
    }
  };

  const redeemReward = (customerId: string, reward: Reward) => {
    // Update customer points
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, points: c.points - reward.pointsCost } : c
      )
    );

    // Add transaction
    const transaction: Transaction = {
      id: `t${Date.now()}`,
      customerId,
      type: 'redeem',
      points: -reward.pointsCost,
      description: `Redeemed: ${reward.title}`,
      date: new Date().toISOString(),
      rewardId: reward.id,
    };
    addTransaction(transaction);

    // Update current customer if it's them
    if (currentCustomer?.id === customerId) {
      setCurrentCustomer((prev) =>
        prev ? { ...prev, points: prev.points - reward.pointsCost } : null
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentCustomer,
        setCurrentCustomer,
        customers,
        addCustomer,
        transactions,
        addTransaction,
        rewards,
        products,
        viewMode,
        setViewMode,
        awardPoints,
        redeemReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
