'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Reward } from '@/types';
import { Star } from 'lucide-react';

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
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rewards</h2>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-starbucks-gold fill-starbucks-gold" />
          <p className="text-gray-600">
            <span className="font-bold text-starbucks-green">{currentCustomer?.points || 0}</span> stars available
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all text-sm ${
              filter === cat
                ? 'bg-starbucks-green text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRewards.map((reward) => {
          const affordable = canAfford(reward);

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-lg ${
                affordable ? 'ring-2 ring-starbucks-green' : ''
              }`}
            >
              {/* Reward Image */}
              <div className="bg-starbucks-cream p-10 text-center relative">
                <div className="text-7xl">{reward.image}</div>
                {affordable && (
                  <div className="absolute top-3 right-3 bg-starbucks-green text-white text-xs font-bold px-3 py-1 rounded-full">
                    Available
                  </div>
                )}
              </div>

              {/* Reward Details */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reward.description}</p>

                {/* Stars Cost */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1.5">
                    <Star className="w-5 h-5 text-starbucks-gold fill-starbucks-gold" />
                    <span className="font-bold text-lg text-starbucks-green">{reward.pointsCost}</span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    reward.category === 'drink' ? 'bg-blue-100 text-blue-700' :
                    reward.category === 'food' ? 'bg-orange-100 text-orange-700' :
                    reward.category === 'discount' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {reward.category}
                  </span>
                </div>

                {/* Redeem Button */}
                <button
                  onClick={() => handleRedeemClick(reward)}
                  disabled={!affordable}
                  className={`w-full py-3 px-4 rounded-full font-bold transition-all ${
                    affordable
                      ? 'bg-starbucks-green text-white hover:bg-starbucks-light-green shadow-md'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {affordable ? 'Redeem' : `Need ${reward.pointsCost - (currentCustomer?.points || 0)} more`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">No rewards in this category</p>
        </div>
      )}

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{selectedReward.image}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedReward.title}</h3>
              <p className="text-gray-600 mb-6">{selectedReward.description}</p>

              <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-starbucks-gold fill-starbucks-gold" />
                  <span className="text-lg font-bold text-starbucks-green">{selectedReward.pointsCost}</span>
                  <span className="text-gray-600">stars will be redeemed</span>
                </div>
                <p className="text-sm text-gray-600">
                  New balance: <span className="font-bold text-starbucks-green">
                    {(currentCustomer?.points || 0) - selectedReward.pointsCost} stars
                  </span>
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedReward(null);
                }}
                className="flex-1 px-6 py-3.5 border-2 border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 px-6 py-3.5 bg-starbucks-green text-white rounded-full font-bold hover:bg-starbucks-light-green transition-colors shadow-md"
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
