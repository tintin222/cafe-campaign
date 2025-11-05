'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Reward } from '@/types';
import { Star, CheckCircle } from 'lucide-react';

export default function RewardsCatalog() {
  const { rewards, currentCustomer, redeemReward } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const categories = ['all', 'drink', 'food', 'discount', 'merchandise'];

  const filteredRewards = rewards.filter(
    (r) => r.active && (filter === 'all' || r.category === filter)
  );

  const canAfford = (reward: Reward) => {
    return currentCustomer ? currentCustomer.points >= reward.pointsCost : false;
  };

  const handleRedeemClick = (reward: Reward) => {
    if (canAfford(reward)) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward && currentCustomer) {
      redeemReward(currentCustomer.id, selectedReward);
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rewards Catalog</h2>
        <p className="text-gray-600">
          You have <span className="font-bold text-amber-600">{currentCustomer?.points || 0} points</span> available
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRewards.map((reward) => {
          const affordable = canAfford(reward);

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${
                affordable ? 'ring-2 ring-green-500' : 'opacity-75'
              }`}
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 text-center">
                <div className="text-6xl mb-2">{reward.image}</div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{reward.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-amber-600">{reward.pointsCost}</span>
                    <span className="text-sm text-gray-500">points</span>
                  </div>

                  {affordable && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>

                <button
                  onClick={() => handleRedeemClick(reward)}
                  disabled={!affordable}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    affordable
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {affordable ? 'Redeem Now' : 'Not Enough Points'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <p className="text-gray-500">No rewards available in this category</p>
        </div>
      )}

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedReward.image}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Redeem Reward?</h3>
              <p className="text-gray-600 mb-4">{selectedReward.title}</p>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  This will deduct <span className="font-bold text-amber-600">{selectedReward.pointsCost} points</span> from your balance
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  New balance: <span className="font-bold">{(currentCustomer?.points || 0) - selectedReward.pointsCost} points</span>
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedReward(null);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
