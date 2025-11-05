'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import LoyaltyCard from './LoyaltyCard';
import RewardsCatalog from './RewardsCatalog';
import TransactionHistory from './TransactionHistory';
import { CreditCard, Gift, History } from 'lucide-react';

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
      <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('card')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
            activeTab === 'card'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">My Card</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
            activeTab === 'rewards'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="font-medium">Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="font-medium">History</span>
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
