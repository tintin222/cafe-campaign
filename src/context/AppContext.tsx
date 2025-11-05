'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, Transaction, Reward, ViewMode, Product, CustomerSegment, Campaign, CustomerPreferences } from '@/types';
import { mockCustomers, mockTransactions, mockRewards, mockProducts, mockSegments, mockCampaigns } from '@/data/mockData';

interface AppContextType {
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomerPreferences: (customerId: string, preferences: CustomerPreferences) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  rewards: Reward[];
  products: Product[];
  segments: CustomerSegment[];
  campaigns: Campaign[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  awardPoints: (customerId: string, points: number, description: string) => void;
  redeemReward: (customerId: string, reward: Reward) => void;
  getCustomerSegments: (customerId: string) => CustomerSegment[];
  getCampaignsForCustomer: (customerId: string) => Campaign[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [rewards] = useState<Reward[]>(mockRewards);
  const [products] = useState<Product[]>(mockProducts);
  const [segments] = useState<CustomerSegment[]>(mockSegments);
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [viewMode, setViewMode] = useState<ViewMode>('customer');

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [...prev, customer]);
  };

  const updateCustomerPreferences = (customerId: string, preferences: CustomerPreferences) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, preferences } : c
      )
    );

    // Update current customer if it's them
    if (currentCustomer?.id === customerId) {
      setCurrentCustomer((prev) =>
        prev ? { ...prev, preferences } : null
      );
    }
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

  // Evaluate if a customer belongs to a segment
  const getCustomerSegments = (customerId: string): CustomerSegment[] => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return [];

    const customerTransactions = transactions.filter((t) => t.customerId === customerId && t.type === 'earn');
    const totalPurchases = customerTransactions.length;

    // Calculate average order value
    const totalSpent = customerTransactions.reduce((sum, t) => sum + t.points / 10, 0); // points / pointsPerDollar
    const avgOrder = totalPurchases > 0 ? totalSpent / totalPurchases : 0;

    // Get purchased categories
    const purchasedCategories = new Set<string>();
    customerTransactions.forEach((t) => {
      t.productIds?.forEach((pid) => {
        const product = products.find((p) => p.id === pid);
        if (product) purchasedCategories.add(product.category);
      });
    });

    // Calculate days since joining
    const joinDate = new Date(customer.joinedDate);
    const today = new Date();
    const daysSinceJoining = Math.floor((today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

    return segments.filter((segment) => {
      if (!segment.active) return false;

      return segment.criteria.every((criterion) => {
        switch (criterion.type) {
          case 'points':
            if (criterion.operator === 'greater_than') return customer.points > Number(criterion.value);
            if (criterion.operator === 'less_than') return customer.points < Number(criterion.value);
            if (criterion.operator === 'equals') return customer.points === Number(criterion.value);
            return false;

          case 'purchases':
            if (criterion.operator === 'greater_than') return totalPurchases > Number(criterion.value);
            if (criterion.operator === 'less_than') return totalPurchases < Number(criterion.value);
            if (criterion.operator === 'equals') return totalPurchases === Number(criterion.value);
            return false;

          case 'category':
            if (criterion.operator === 'contains') {
              return purchasedCategories.has(String(criterion.value));
            }
            return false;

          case 'join_date':
            if (criterion.operator === 'less_than') return daysSinceJoining < Number(criterion.value);
            if (criterion.operator === 'greater_than') return daysSinceJoining > Number(criterion.value);
            return false;

          case 'avg_order':
            if (criterion.operator === 'greater_than') return avgOrder > Number(criterion.value);
            if (criterion.operator === 'less_than') return avgOrder < Number(criterion.value);
            return false;

          case 'preference':
            if (!customer.preferences || !criterion.preferenceField) return false;
            const prefValue = customer.preferences[criterion.preferenceField as keyof CustomerPreferences];

            if (criterion.operator === 'includes_any') {
              // Check if customer preference array includes any of the values
              if (Array.isArray(prefValue) && Array.isArray(criterion.value)) {
                const prefArray = prefValue as string[];
                const criteriaArray = criterion.value as string[];
                return criteriaArray.some((v: string) => prefArray.includes(v));
              }
              return false;
            }

            if (criterion.operator === 'includes_all') {
              // Check if customer preference array includes all of the values
              if (Array.isArray(prefValue) && Array.isArray(criterion.value)) {
                const prefArray = prefValue as string[];
                const criteriaArray = criterion.value as string[];
                return criteriaArray.every((v: string) => prefArray.includes(v));
              }
              return false;
            }

            if (criterion.operator === 'equals') {
              return prefValue === criterion.value;
            }

            if (criterion.operator === 'contains') {
              if (Array.isArray(prefValue)) {
                const prefArray = prefValue as string[];
                return prefArray.includes(String(criterion.value));
              }
              return false;
            }

            return false;

          default:
            return false;
        }
      });
    });
  };

  // Get active campaigns for a customer based on their segments
  const getCampaignsForCustomer = (customerId: string): Campaign[] => {
    const customerSegments = getCustomerSegments(customerId);
    const customerSegmentIds = new Set(customerSegments.map((s) => s.id));

    return campaigns.filter(
      (campaign) =>
        campaign.status === 'active' &&
        customerSegmentIds.has(campaign.segmentId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentCustomer,
        setCurrentCustomer,
        customers,
        addCustomer,
        updateCustomerPreferences,
        transactions,
        addTransaction,
        rewards,
        products,
        segments,
        campaigns,
        viewMode,
        setViewMode,
        awardPoints,
        redeemReward,
        getCustomerSegments,
        getCampaignsForCustomer,
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
