'use client';

import { useApp } from '@/context/AppContext';
import { Megaphone, Calendar, Target, Eye, Gift } from 'lucide-react';

export default function Campaigns() {
  const { campaigns, segments } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getOfferTypeLabel = (offerType: string) => {
    switch (offerType) {
      case 'discount':
        return 'Discount';
      case 'bonus_stars':
        return 'Bonus Stars';
      case 'free_item':
        return 'Free Item';
      case 'bogo':
        return 'BOGO';
      default:
        return offerType;
    }
  };

  const getOfferTypeIcon = (offerType: string) => {
    switch (offerType) {
      case 'discount':
        return '💰';
      case 'bonus_stars':
        return '⭐';
      case 'free_item':
        return '🎁';
      case 'bogo':
        return '🛍️';
      default:
        return '🎯';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-heading font-bold text-gray-900">Marketing Campaigns</h3>
          <p className="text-sm text-gray-600 mt-1">Targeted offers for customer segments</p>
        </div>
        <Megaphone className="w-8 h-8 text-starbucks-green" />
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const segment = segments.find((s) => s.id === campaign.segmentId);
          const isActive = campaign.status === 'active';

          return (
            <div
              key={campaign.id}
              className={`border-2 rounded-2xl p-5 transition-all ${
                isActive ? 'border-starbucks-green bg-starbucks-cream' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-4">
                  {/* Campaign Image/Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-starbucks-gold to-starbucks-tan flex items-center justify-center text-3xl flex-shrink-0">
                    {campaign.image}
                  </div>

                  {/* Campaign Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">{campaign.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>

                    {/* Offer Details */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-starbucks-green">
                        <span>{getOfferTypeIcon(campaign.offerType)}</span>
                        <span className="text-sm font-bold text-starbucks-green">
                          {getOfferTypeLabel(campaign.offerType)}: {campaign.offerValue}
                        </span>
                      </div>
                    </div>

                    {/* Target Segment */}
                    {segment && (
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          Targeting:{' '}
                          <span className="font-bold" style={{ color: segment.color }}>
                            {segment.icon} {segment.name}
                          </span>{' '}
                          ({segment.customerCount || 0} customers)
                        </span>
                      </div>
                    )}

                    {/* Date Range */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-xs text-gray-600">
                        {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Performance Metrics */}
                    <div className="flex items-center gap-6 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          <span className="font-bold text-gray-900">{campaign.views}</span> views
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          <span className="font-bold text-gray-900">{campaign.redemptions}</span> redemptions
                        </span>
                      </div>
                      {campaign.views > 0 && (
                        <div className="text-xs text-gray-600">
                          <span className="font-bold text-starbucks-green">
                            {((campaign.redemptions / campaign.views) * 100).toFixed(1)}%
                          </span>{' '}
                          conversion
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-starbucks-green">
              {campaigns.filter((c) => c.status === 'active').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {campaigns.filter((c) => c.status === 'scheduled').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Scheduled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {campaigns.filter((c) => c.status === 'ended').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Ended</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-starbucks-gold">
              {campaigns.reduce((sum, c) => sum + c.redemptions, 0)}
            </div>
            <div className="text-xs text-gray-600 mt-1">Total Redemptions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
