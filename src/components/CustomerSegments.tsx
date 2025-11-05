'use client';

import { useApp } from '@/context/AppContext';
import { Users, TrendingUp } from 'lucide-react';

export default function CustomerSegments() {
  const { segments, customers, getCustomerSegments } = useApp();

  // Calculate actual customer count for each segment
  const segmentsWithCounts = segments.map((segment) => {
    const count = customers.filter((customer) => {
      const customerSegments = getCustomerSegments(customer.id);
      return customerSegments.some((s) => s.id === segment.id);
    }).length;
    return { ...segment, customerCount: count };
  });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-heading font-bold text-gray-900">Customer Segments</h3>
          <p className="text-sm text-gray-600 mt-1">Automatically calculated based on customer behavior</p>
        </div>
        <Users className="w-8 h-8 text-starbucks-green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {segmentsWithCounts.map((segment) => (
          <div
            key={segment.id}
            className="border-2 rounded-2xl p-5 hover:border-starbucks-green transition-all cursor-pointer"
            style={{ borderColor: segment.active ? '#e5e7eb' : '#f3f4f6' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: segment.color + '20' }}
                >
                  {segment.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{segment.name}</h4>
                  <p className="text-xs text-gray-600">{segment.description}</p>
                </div>
              </div>
              {!segment.active && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  Inactive
                </span>
              )}
            </div>

            {/* Criteria */}
            <div className="mb-3 space-y-1">
              {segment.criteria.map((criterion, idx) => (
                <div key={idx} className="text-xs bg-starbucks-cream px-3 py-2 rounded-lg">
                  {criterion.label}
                </div>
              ))}
            </div>

            {/* Customer Count */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-starbucks-green">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">{segment.customerCount} customers</span>
              </div>
              <span className="text-xs text-gray-500">
                Created {new Date(segment.createdDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-starbucks-green">
              {segmentsWithCounts.filter((s) => s.active).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Active Segments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-starbucks-green">{customers.length}</div>
            <div className="text-xs text-gray-600 mt-1">Total Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-starbucks-green">
              {Math.round(
                segmentsWithCounts.reduce((sum, s) => sum + (s.customerCount || 0), 0) /
                  segmentsWithCounts.filter((s) => s.active).length
              )}
            </div>
            <div className="text-xs text-gray-600 mt-1">Avg per Segment</div>
          </div>
        </div>
      </div>
    </div>
  );
}
