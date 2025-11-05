'use client';

import { useApp } from '@/context/AppContext';
import { ArrowUp, ArrowDown, Calendar } from 'lucide-react';

interface TransactionHistoryProps {
  customerId: string;
}

export default function TransactionHistory({ customerId }: TransactionHistoryProps) {
  const { transactions } = useApp();

  const customerTransactions = transactions
    .filter((t) => t.customerId === customerId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">History</h2>
        <p className="text-gray-600">All your stars activity in one place</p>
      </div>

      {/* Transactions List */}
      {customerTransactions.length > 0 ? (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {customerTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                index !== customerTransactions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'earn'
                      ? 'bg-green-100'
                      : 'bg-orange-100'
                  }`}
                >
                  {transaction.type === 'earn' ? (
                    <ArrowUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ArrowDown className="w-6 h-6 text-orange-600" />
                  )}
                </div>

                <div>
                  <div className="font-semibold text-gray-900">
                    {transaction.description}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>

              <div
                className={`text-lg font-bold ${
                  transaction.type === 'earn' ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {transaction.type === 'earn' ? '+' : ''}{transaction.points}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <div className="text-6xl mb-4 opacity-50">📋</div>
          <p className="text-gray-500 text-lg">No transactions yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Make your first purchase to start earning points!
          </p>
        </div>
      )}

      {/* Summary */}
      {customerTransactions.length > 0 && (
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold">
                {customerTransactions.filter((t) => t.type === 'earn').length}
              </div>
              <div className="text-sm opacity-90">Total Purchases</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {customerTransactions.filter((t) => t.type === 'redeem').length}
              </div>
              <div className="text-sm opacity-90">Rewards Redeemed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
