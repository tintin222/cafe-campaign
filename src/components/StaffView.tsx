'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Scan, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

export default function StaffView() {
  const { customers, awardPoints } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.qrCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAwardPoints = () => {
    if (!selectedCustomer || !purchaseAmount) return;

    const amount = parseFloat(purchaseAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid purchase amount');
      setShowSuccess(false);
      return;
    }

    const points = Math.floor(amount * 10); // 10 points per dollar
    const customer = customers.find((c) => c.id === selectedCustomer);

    awardPoints(selectedCustomer, points, `Purchase at MOC Coffee ($${amount.toFixed(2)})`);

    setMessage(`Awarded ${points} points to ${customer?.name}!`);
    setShowSuccess(true);
    setPurchaseAmount('');
    setSelectedCustomer(null);
    setSearchQuery('');

    setTimeout(() => {
      setShowSuccess(false);
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Scan className="w-8 h-8 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-900">Staff Portal</h2>
        </div>
        <p className="text-gray-600">Search for customers and award points</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`rounded-xl p-4 flex items-center space-x-3 ${
            showSuccess ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          {showSuccess ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-600" />
          )}
          <span className={showSuccess ? 'text-green-800' : 'text-red-800'}>
            {message}
          </span>
        </div>
      )}

      {/* Search Customer */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Search Customer (Name, Email, Phone, or QR Code)
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, or scan QR code..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* Customer Results */}
        {searchQuery && (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-amber-50 hover:border-amber-300 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.email}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-600">{customer.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No customers found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Customer & Award Points */}
      {selectedCustomer && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border-2 border-amber-200">
          {(() => {
            const customer = customers.find((c) => c.id === selectedCustomer);
            return (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Selected Customer</h3>
                  <div className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <div className="text-xl font-bold text-gray-900">{customer?.name}</div>
                      <div className="text-sm text-gray-600">{customer?.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">{customer?.points}</div>
                      <div className="text-xs text-gray-500">current points</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Amount ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                    />
                  </div>
                  {purchaseAmount && !isNaN(parseFloat(purchaseAmount)) && (
                    <div className="mt-2 text-sm text-amber-700">
                      This will award <span className="font-bold">{Math.floor(parseFloat(purchaseAmount) * 10)} points</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedCustomer(null);
                      setPurchaseAmount('');
                    }}
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAwardPoints}
                    disabled={!purchaseAmount || parseFloat(purchaseAmount) <= 0}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    Award Points
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-3xl font-bold text-gray-900">{customers.length}</div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-3xl font-bold text-amber-600">
            {customers.reduce((sum, c) => sum + c.points, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Points Awarded</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-3xl font-bold text-green-600">
            {Math.floor(customers.reduce((sum, c) => sum + c.points, 0) / 10)}
          </div>
          <div className="text-sm text-gray-600">Avg Points per Customer</div>
        </div>
      </div>
    </div>
  );
}
