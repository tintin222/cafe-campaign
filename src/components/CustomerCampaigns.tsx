'use client';

import { useApp } from '@/context/AppContext';
import { Gift, Calendar, Sparkles } from 'lucide-react';

interface CustomerCampaignsProps {
  customerId: string;
}

export default function CustomerCampaigns({ customerId }: CustomerCampaignsProps) {
  const { getCampaignsForCustomer, getCustomerSegments } = useApp();

  const campaigns = getCampaignsForCustomer(customerId);
  const customerSegments = getCustomerSegments(customerId);

  if (campaigns.length === 0) {
    return null;
  }

  const getOfferTypeColor = (offerType: string) => {
    switch (offerType) {
      case 'discount':
        return 'from-blue-500 to-blue-600';
      case 'bonus_stars':
        return 'from-starbucks-gold to-amber-500';
      case 'free_item':
        return 'from-starbucks-green to-emerald-600';
      case 'bogo':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Customer Segments Badge */}
      {customerSegments.length > 0 && (
        <div className="bg-gradient-to-r from-starbucks-gold to-amber-500 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">Your Membership Status</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {customerSegments.map((segment) => (
              <div
                key={segment.id}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
              >
                <span>{segment.icon}</span>
                <span>{segment.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Offers Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-gray-900">Special Offers For You</h3>
            <p className="text-sm text-gray-600 mt-1">
              {campaigns.length} {campaigns.length === 1 ? 'offer' : 'offers'} available
            </p>
          </div>
          <Gift className="w-6 h-6 text-starbucks-green" />
        </div>

        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="border-2 border-starbucks-green rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Campaign Header with Gradient */}
              <div className={`bg-gradient-to-r ${getOfferTypeColor(campaign.offerType)} p-4 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-3xl mb-2">{campaign.image}</div>
                    <h4 className="font-bold text-lg mb-1">{campaign.name}</h4>
                    <p className="text-sm opacity-90">{campaign.description}</p>
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div className="p-4 bg-starbucks-cream">
                {/* Offer Value - Prominent Display */}
                <div className="bg-white rounded-xl p-4 mb-3 text-center border-2 border-starbucks-green">
                  <div className="text-2xl font-bold text-starbucks-green mb-1">{campaign.offerValue}</div>
                  <div className="text-xs text-gray-600 uppercase font-bold tracking-wide">
                    {campaign.offerType.replace('_', ' ')}
                  </div>
                </div>

                {/* Validity */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Valid until {new Date(campaign.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* Terms and Conditions */}
                {campaign.termsAndConditions && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 italic">{campaign.termsAndConditions}</p>
                  </div>
                )}

                {/* CTA Button */}
                <button className="w-full mt-3 bg-starbucks-green hover:bg-starbucks-light-green text-white font-bold py-3 px-4 rounded-xl transition-colors">
                  Use This Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
