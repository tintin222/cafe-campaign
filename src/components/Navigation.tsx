'use client';

import { useApp } from '@/context/AppContext';
import { Star, User, Scan, Settings, LogOut } from 'lucide-react';

export default function Navigation() {
  const { currentCustomer, setCurrentCustomer, viewMode, setViewMode } = useApp();

  const handleLogout = () => {
    setCurrentCustomer(null);
    setViewMode('customer');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-starbucks-green rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-starbucks-gold fill-starbucks-gold" />
            </div>
            <span className="text-xl font-bold text-gray-900">MOC Coffee</span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center space-x-1 bg-starbucks-cream rounded-full p-1">
            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                viewMode === 'customer'
                  ? 'bg-starbucks-green text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-semibold">Customer</span>
            </button>

            <button
              onClick={() => setViewMode('staff')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                viewMode === 'staff'
                  ? 'bg-starbucks-green text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-semibold">Staff</span>
            </button>

            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                viewMode === 'admin'
                  ? 'bg-starbucks-green text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-semibold">Admin</span>
            </button>
          </div>

          {/* User Info / Logout */}
          {currentCustomer && viewMode === 'customer' && (
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-semibold text-gray-900">{currentCustomer.name}</div>
                <div className="flex items-center justify-end space-x-1 text-xs text-gray-600">
                  <Star className="w-3 h-3 text-starbucks-gold fill-starbucks-gold" />
                  <span>{currentCustomer.points} stars</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
