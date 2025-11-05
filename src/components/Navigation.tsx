'use client';

import { useApp } from '@/context/AppContext';
import { Coffee, User, Scan, Settings, LogOut } from 'lucide-react';

export default function Navigation() {
  const { currentCustomer, setCurrentCustomer, viewMode, setViewMode } = useApp();

  const handleLogout = () => {
    setCurrentCustomer(null);
    setViewMode('customer');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Coffee className="w-6 h-6 text-amber-600" />
            <span className="text-xl font-bold text-gray-900">MOC Coffee</span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                viewMode === 'customer'
                  ? 'bg-white shadow-sm text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Customer</span>
            </button>

            <button
              onClick={() => setViewMode('staff')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                viewMode === 'staff'
                  ? 'bg-white shadow-sm text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Staff</span>
            </button>

            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                viewMode === 'admin'
                  ? 'bg-white shadow-sm text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Admin</span>
            </button>
          </div>

          {/* User Info / Logout */}
          {currentCustomer && viewMode === 'customer' && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-gray-900">{currentCustomer.name}</div>
                <div className="text-xs text-gray-500">{currentCustomer.points} pts</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors"
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
