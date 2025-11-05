'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import LoyaltyCard from './LoyaltyCard';
import RewardsCatalog from './RewardsCatalog';
import TransactionHistory from './TransactionHistory';
import { Star, Gift, History } from 'lucide-react';

type Tab = 'card' | 'rewards' | 'history';

export default function CustomerView() {
  const { currentCustomer } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('card');

  if (!currentCustomer) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Please sign up to view your loyalty card</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-white rounded-full p-1.5 shadow-sm">
        <button
          onClick={() => setActiveTab('card')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-full transition-all ${
            activeTab === 'card'
              ? 'bg-starbucks-green text-white shadow-md'
              : 'text-gray-600 hover:bg-starbucks-cream'
          }`}
        >
          <Star className="w-5 h-5" />
          <span className="font-semibold">My Card</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-full transition-all ${
            activeTab === 'rewards'
              ? 'bg-starbucks-green text-white shadow-md'
              : 'text-gray-600 hover:bg-starbucks-cream'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-full transition-all ${
            activeTab === 'history'
              ? 'bg-starbucks-green text-white shadow-md'
              : 'text-gray-600 hover:bg-starbucks-cream'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="font-semibold">History</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'card' && <LoyaltyCard customer={currentCustomer} />}
        {activeTab === 'rewards' && <RewardsCatalog />}
        {activeTab === 'history' && <TransactionHistory customerId={currentCustomer.id} />}
      </div>
    </div>
  );
}
