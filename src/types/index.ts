export interface CustomerPreferences {
  // Beverage Preferences
  favoriteDrinkTypes?: ('hot-coffee' | 'iced-coffee' | 'hot-tea' | 'iced-tea' | 'specialty' | 'frappuccino')[];
  caffeinePreference?: 'regular' | 'decaf' | 'half-caf' | 'no-preference';
  milkPreferences?: ('whole' | 'skim' | 'oat' | 'almond' | 'soy' | 'coconut' | 'no-milk')[];
  sweetnessLevel?: 'unsweetened' | 'lightly-sweet' | 'regular' | 'extra-sweet';

  // Dietary Restrictions
  dietaryRestrictions?: ('vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-allergy' | 'sugar-free')[];

  // Favorite Flavors
  favoriteFlavors?: ('vanilla' | 'caramel' | 'hazelnut' | 'mocha' | 'pumpkin-spice' | 'cinnamon' | 'mint' | 'chocolate')[];

  // Size Preference
  preferredSize?: 'small' | 'medium' | 'large' | 'extra-large';

  // Visit Patterns (self-reported)
  preferredVisitTimes?: ('early-morning' | 'morning' | 'midday' | 'afternoon' | 'evening')[];
  visitFrequency?: 'daily' | 'few-times-week' | 'weekly' | 'occasionally';
  visitPurpose?: ('work-study' | 'social' | 'quick-grab' | 'relaxation')[];

  // Food Preferences
  favoriteFoodCategories?: ('pastries' | 'sandwiches' | 'salads' | 'snacks' | 'breakfast')[];
  tastePreference?: 'sweet' | 'savory' | 'both';

  // Interests
  interests?: ('new-products' | 'seasonal-specials' | 'limited-offers' | 'events' | 'sustainability')[];

  // Environmental
  bringOwnCup?: boolean;
  preferSustainablePackaging?: boolean;

  // Communication Preferences
  communicationPreferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly' | 'special-only';
  };

  // Completion tracking
  profileCompleteness?: number; // 0-100
  lastUpdated?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  joinedDate: string;
  qrCode: string;
  preferences?: CustomerPreferences;
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
  type: 'points' | 'purchases' | 'category' | 'join_date' | 'avg_order' | 'preference';
  operator: 'greater_than' | 'less_than' | 'equals' | 'contains' | 'includes_any' | 'includes_all';
  value: number | string | string[] | boolean;
  label: string;
  preferenceField?: string; // For preference-based criteria (e.g., 'favoriteDrinkTypes', 'dietaryRestrictions')
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
