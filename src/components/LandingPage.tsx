'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Customer } from '@/types';
import { Coffee, Gift, Star, CreditCard } from 'lucide-react';

export default function LandingPage() {
  const { addCustomer, setCurrentCustomer } = useApp();
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      points: 0,
      joinedDate: new Date().toISOString(),
      qrCode: `MOC-${Date.now()}-${formData.name.toUpperCase().replace(/\s+/g, '-')}`,
    };

    addCustomer(newCustomer);
    setCurrentCustomer(newCustomer);
  };

  if (showSignUp) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">☕</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Join MOC Coffee</h1>
            <p className="text-gray-600">Start earning rewards today</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-4 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg"
              >
                Join Now
              </button>

              <button
                type="button"
                onClick={() => setShowSignUp(false)}
                className="w-full text-gray-600 hover:text-gray-800 font-medium"
              >
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="text-8xl mb-6 animate-bounce">☕</div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          MOC Coffee
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Where every sip earns you more
        </p>
        <button
          onClick={() => setShowSignUp(true)}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 px-12 rounded-full text-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          Join Loyalty Program
        </button>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Digital Card</h3>
            <p className="text-gray-600 text-sm">Get your loyalty card instantly on your phone</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Earn Points</h3>
            <p className="text-gray-600 text-sm">Get 10 points for every dollar spent</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Amazing Rewards</h3>
            <p className="text-gray-600 text-sm">Redeem points for free drinks and food</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-sm">Just scan your QR code at checkout</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10</div>
              <div className="text-amber-100">Points per $1</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-amber-100">Rewards Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-amber-100">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
