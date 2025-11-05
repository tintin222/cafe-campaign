'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Customer } from '@/types';
import { Star } from 'lucide-react';

export default function LandingPage() {
  const { addCustomer, setCurrentCustomer, customers } = useApp();
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
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-starbucks-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-starbucks-gold fill-starbucks-gold" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join MOC Rewards</h1>
            <p className="text-gray-600">Start earning stars with every purchase</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-green focus:border-transparent text-gray-900"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-green focus:border-transparent text-gray-900"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-green focus:border-transparent text-gray-900"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-starbucks-green text-white font-bold py-4 rounded-full hover:bg-starbucks-light-green transition-colors shadow-md"
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() => setShowSignUp(false)}
                className="w-full text-starbucks-green hover:text-starbucks-dark-green font-semibold"
              >
                Back to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-starbucks-green text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-12 h-12 text-starbucks-gold fill-starbucks-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MOC Rewards
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50">
            Earn stars with every purchase
          </p>
          <button
            onClick={() => setShowSignUp(true)}
            className="bg-white text-starbucks-green font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-50 transition-all shadow-lg"
          >
            Join Now
          </button>
        </div>
      </div>

      {/* Demo Mode Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Try Demo Mode</h3>
              <p className="text-gray-600">Select a sample account to explore the app</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setCurrentCustomer(customer)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-starbucks-green text-left group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-14 h-14 bg-starbucks-green rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-starbucks-light-green transition-colors">
                      {customer.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-starbucks-cream rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-starbucks-gold fill-starbucks-gold" />
                      <span className="text-2xl font-bold text-starbucks-green">{customer.points}</span>
                    </div>
                    <span className="text-sm text-gray-600">Stars</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-starbucks-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Join Rewards</h3>
            <p className="text-gray-600">Create your account and get a digital membership card</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-starbucks-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Stars</h3>
            <p className="text-gray-600">Collect 10 stars for every dollar you spend</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-starbucks-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Get Rewards</h3>
            <p className="text-gray-600">Redeem stars for free drinks, food, and more</p>
          </div>
        </div>
      </div>

      {/* Rewards Preview */}
      <div className="bg-starbucks-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Delicious Rewards</h2>
          <p className="text-center text-gray-600 mb-12">Choose from a variety of rewards</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['☕', '🥐', '🍵', '🥪'].map((emoji, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-5xl mb-3">{emoji}</div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-starbucks-gold fill-starbucks-gold" />
                  <span className="font-bold text-starbucks-green">{(i + 1) * 50}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h2>
        <p className="text-gray-600 mb-8 text-lg">Join thousands of happy MOC Coffee members</p>
        <button
          onClick={() => setShowSignUp(true)}
          className="bg-starbucks-green text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-starbucks-light-green transition-colors shadow-lg"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
}
