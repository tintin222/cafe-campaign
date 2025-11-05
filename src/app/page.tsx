'use client';

import { useApp } from '@/context/AppContext';
import LandingPage from '@/components/LandingPage';
import CustomerView from '@/components/CustomerView';
import StaffView from '@/components/StaffView';
import AdminView from '@/components/AdminView';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { currentCustomer, viewMode } = useApp();

  // Show landing page if no customer is logged in and we're in customer mode
  if (!currentCustomer && viewMode === 'customer') {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen pb-20">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        {viewMode === 'customer' && <CustomerView />}
        {viewMode === 'staff' && <StaffView />}
        {viewMode === 'admin' && <AdminView />}
      </main>
    </div>
  );
}
