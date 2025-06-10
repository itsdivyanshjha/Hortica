// Core Types for PlantBuilder Application

export interface User {
  _id: string;
  email: string;
  password?: string;
  name: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  _id?: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface Plant {
  _id: string;
  name: string;
  category: 'indoor' | 'outdoor';
  description: string;
  price: number;
  images: string[];
  care_level: 'easy' | 'medium' | 'hard';
  light_requirement: string;
  watering_frequency: string;
  size: 'small' | 'medium' | 'large';
  created_at: Date;
  updated_at: Date;
}

export interface Soil {
  _id: string;
  name: string;
  description: string;
  price: number;
  suitable_for: ('indoor' | 'outdoor')[];
  ingredients: string[];
  ph_level: string;
  created_at: Date;
  updated_at: Date;
}

export interface Pot {
  _id: string;
  name: string;
  description: string;
  price: number;
  material: string;
  colors: string[];
  sizes: ('small' | 'medium' | 'large')[];
  drainage: boolean;
  weight: number;
  created_at: Date;
  updated_at: Date;
}

export interface Engraving {
  _id: string;
  name: string;
  description: string;
  price: number;
  max_characters?: number;
  fonts?: string[];
  symbols?: string[];
  positions: string[];
  created_at: Date;
  updated_at: Date;
}

export interface ConfigurationItem {
  plant?: Plant;
  soil?: Soil;
  pot?: Pot;
  potColor?: string;
  potSize?: 'small' | 'medium' | 'large';
  engraving?: {
    type: Engraving;
    text?: string;
    symbol?: string;
    font?: string;
    position?: string;
  };
}

export interface Configuration {
  _id?: string;
  user_id: string;
  name: string;
  items: ConfigurationItem;
  total_price: number;
  is_saved: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
  _id: string;
  configuration: ConfigurationItem;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}

export interface Order {
  _id: string;
  user_id: string;
  items: CartItem[];
  shipping_address: Address;
  billing_address: Address;
  payment_method: 'stripe' | 'paytm' | 'cod';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  order_status: 'received' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping_fee: number;
  tax_amount: number;
  total_amount: number;
  stripe_payment_intent_id?: string;
  tracking_number?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Configurator Step Types
export type ConfiguratorStep = 'plant' | 'soil' | 'pot' | 'engraving' | 'review';

export interface ConfiguratorState {
  currentStep: ConfiguratorStep;
  configuration: ConfigurationItem;
  totalPrice: number;
  isValid: boolean;
}

// Filter Types
export interface PlantFilters {
  category?: 'indoor' | 'outdoor';
  care_level?: 'easy' | 'medium' | 'hard';
  size?: 'small' | 'medium' | 'large';
  price_min?: number;
  price_max?: number;
  search?: string;
}

export interface OrderFilters {
  status?: Order['order_status'];
  payment_status?: Order['payment_status'];
  date_from?: string;
  date_to?: string;
} 