'use client';

import { useApp } from '@/context/AppContext';
import { Settings, Users, Award, TrendingUp, Star } from 'lucide-react';
import { cafeSettings } from '@/data/mockData';
import CustomerSegments from './CustomerSegments';
import Campaigns from './Campaigns';

export default function AdminView() {
  const { rewards, customers, transactions } = useApp();

  const totalPointsAwarded = transactions
    .filter((t) => t.type === 'earn')
    .reduce((sum, t) => sum + t.points, 0);

  const totalPointsRedeemed = Math.abs(
    transactions
      .filter((t) => t.type === 'redeem')
      .reduce((sum, t) => sum + t.points, 0)
  );

  const activeCustomers = customers.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="w-8 h-8 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        </div>
        <p className="text-gray-600">Manage {cafeSettings.name} loyalty program</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{activeCustomers}</div>
          <div className="text-sm opacity-90">Active Members</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalPointsAwarded.toLocaleString()}</div>
          <div className="text-sm opacity-90">Points Awarded</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalPointsRedeemed.toLocaleString()}</div>
          <div className="text-sm opacity-90">Points Redeemed</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{rewards.filter((r) => r.active).length}</div>
          <div className="text-sm opacity-90">Active Rewards</div>
        </div>
      </div>

      {/* Customer Segments */}
      <CustomerSegments />

      {/* Marketing Campaigns */}
      <Campaigns />

      {/* Cafe Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Cafe Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Cafe Name</label>
            <div className="mt-1 text-lg text-gray-900">{cafeSettings.name}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Points per Dollar</label>
            <div className="mt-1 text-lg text-gray-900">{cafeSettings.pointsPerDollar} points</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1 text-gray-900">{cafeSettings.address}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Contact</label>
            <div className="mt-1 text-gray-900">{cafeSettings.phone}</div>
            <div className="text-gray-900">{cafeSettings.email}</div>
          </div>
        </div>
      </div>

      {/* Rewards Management */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Rewards Management</h3>
          <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 shadow-md">
            + Add New Reward
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Reward</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Points Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward) => (
                <tr key={reward.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{reward.image}</span>
                      <div>
                        <div className="font-medium text-gray-900">{reward.title}</div>
                        <div className="text-sm text-gray-600">{reward.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize">
                      {reward.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-amber-600">{reward.pointsCost}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        reward.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {reward.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Customers</h3>
        <div className="space-y-3">
          {customers
            .sort((a, b) => b.points - a.points)
            .slice(0, 5)
            .map((customer, index) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-600">{customer.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-amber-600">{customer.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
