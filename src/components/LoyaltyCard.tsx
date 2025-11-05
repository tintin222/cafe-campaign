'use client';

import { Customer } from '@/types';
import { QRCodeSVG } from 'qrcode.react';
import { Star } from 'lucide-react';

interface LoyaltyCardProps {
  customer: Customer;
}

export default function LoyaltyCard({ customer }: LoyaltyCardProps) {
  const nextRewardAt = 100;
  const currentProgress = customer.points % nextRewardAt;
  const progressPercentage = (currentProgress / nextRewardAt) * 100;
  const starsEarned = Math.floor(customer.points / 10);
  const totalRewards = Math.floor(customer.points / nextRewardAt);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Rewards Progress Card */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {customer.name}
          </h2>
          <p className="text-gray-600">MOC Rewards Member</p>
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer Circle */}
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#00704A"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progressPercentage / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Star className="w-12 h-12 text-starbucks-gold fill-starbucks-gold mb-2" />
              <div className="text-4xl font-bold text-starbucks-green">{currentProgress}</div>
              <div className="text-sm text-gray-600">/ {nextRewardAt} Stars</div>
            </div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-center mb-6">
          <p className="text-gray-900 font-semibold mb-2">
            {nextRewardAt - currentProgress} stars until your next reward
          </p>
          <p className="text-sm text-gray-600">
            You have {totalRewards} reward{totalRewards !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Star Collection */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[...Array(10)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < (currentProgress / 10)
                  ? 'text-starbucks-gold fill-starbucks-gold'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* QR Code Card */}
      <div className="bg-starbucks-green rounded-3xl p-8 text-center shadow-lg">
        <h3 className="text-xl font-bold text-white mb-6">Your Rewards Code</h3>
        <div className="bg-white rounded-2xl p-6 inline-block">
          <QRCodeSVG
            value={customer.qrCode}
            size={200}
            level="H"
            includeMargin={false}
            fgColor="#00704A"
          />
        </div>
        <p className="text-white/90 mt-4 text-sm">
          Show this code at checkout to earn stars
        </p>
        <p className="text-white/70 mt-2 text-xs font-mono">{customer.qrCode}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <Star className="w-8 h-8 text-starbucks-gold fill-starbucks-gold" />
          </div>
          <div className="text-2xl font-bold text-starbucks-green">{starsEarned}</div>
          <div className="text-xs text-gray-600 mt-1">Total Stars</div>
        </div>

        <div className="bg-white rounded-2xl p-4 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 bg-starbucks-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{totalRewards}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-starbucks-green">{totalRewards}</div>
          <div className="text-xs text-gray-600 mt-1">Rewards</div>
        </div>

        <div className="bg-white rounded-2xl p-4 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <div className="text-2xl">🎁</div>
          </div>
          <div className="text-2xl font-bold text-starbucks-green">
            {new Date(customer.joinedDate).toLocaleDateString('en-US', { month: 'short' })}
          </div>
          <div className="text-xs text-gray-600 mt-1">Member Since</div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center">
          <span className="text-lg mr-2">💡</span>
          Earning Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <Star className="w-4 h-4 text-starbucks-gold fill-starbucks-gold mr-2 mt-0.5 flex-shrink-0" />
            <span>Earn 10 stars for every $1 spent</span>
          </li>
          <li className="flex items-start">
            <Star className="w-4 h-4 text-starbucks-gold fill-starbucks-gold mr-2 mt-0.5 flex-shrink-0" />
            <span>Collect 100 stars to redeem a reward</span>
          </li>
          <li className="flex items-start">
            <Star className="w-4 h-4 text-starbucks-gold fill-starbucks-gold mr-2 mt-0.5 flex-shrink-0" />
            <span>Stars never expire - save them up!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
