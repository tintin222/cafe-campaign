'use client';

import { Customer } from '@/types';
import { QRCodeSVG } from 'qrcode.react';
import { Star, TrendingUp, Calendar } from 'lucide-react';

interface LoyaltyCardProps {
  customer: Customer;
}

export default function LoyaltyCard({ customer }: LoyaltyCardProps) {
  const nextRewardAt = 100;
  const progress = (customer.points % nextRewardAt) / nextRewardAt * 100;

  return (
    <div className="space-y-6">
      {/* Digital Card */}
      <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm opacity-90 mb-1">MOC Coffee Member</div>
            <div className="text-2xl font-bold">{customer.name}</div>
          </div>
          <div className="text-4xl">☕</div>
        </div>

        <div className="bg-white rounded-2xl p-6 text-gray-900">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 mb-2">Scan to earn points</div>
            <div className="bg-white p-4 rounded-xl inline-block">
              <QRCodeSVG
                value={customer.qrCode}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2 font-mono">{customer.qrCode}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-3xl font-bold">{customer.points}</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-3xl font-bold">{new Date(customer.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
            <div className="text-sm opacity-90">Member Since</div>
          </div>
        </div>
      </div>

      {/* Progress to Next Reward */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Progress to Next Reward</h3>
          <Star className="w-6 h-6 text-yellow-500" />
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Current Points</span>
            <span className="font-bold text-amber-600">{customer.points % nextRewardAt} / {nextRewardAt}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          You need <span className="font-bold text-amber-600">{nextRewardAt - (customer.points % nextRewardAt)} more points</span> to unlock your next reward!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{customer.points}</div>
              <div className="text-sm text-gray-600">Lifetime Points</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{Math.floor(customer.points / 100)}</div>
              <div className="text-sm text-gray-600">Rewards Earned</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.floor((new Date().getTime() - new Date(customer.joinedDate).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
