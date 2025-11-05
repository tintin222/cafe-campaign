export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  joinedDate: string;
  qrCode: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  active: boolean;
  category: 'drink' | 'food' | 'merchandise' | 'discount';
}

export interface Transaction {
  id: string;
  customerId: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  date: string;
  rewardId?: string;
}

export interface CafeSettings {
  name: string;
  pointsPerDollar: number;
  logo: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
}

export type ViewMode = 'customer' | 'staff' | 'admin';
