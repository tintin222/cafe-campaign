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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'hot-drinks' | 'cold-drinks' | 'food' | 'merchandise';
  image: string;
  popular: boolean;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  date: string;
  rewardId?: string;
  productIds?: string[];
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

export interface SegmentCriteria {
  type: 'points' | 'purchases' | 'category' | 'join_date' | 'avg_order';
  operator: 'greater_than' | 'less_than' | 'equals' | 'contains';
  value: number | string;
  label: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  criteria: SegmentCriteria[];
  customerCount?: number;
  createdDate: string;
  active: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  segmentId: string;
  offerType: 'discount' | 'bonus_stars' | 'free_item' | 'bogo';
  offerValue: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'ended';
  image: string;
  views: number;
  redemptions: number;
  termsAndConditions?: string;
}

export type ViewMode = 'customer' | 'staff' | 'admin';
