// Core Types for PlantBuilder Application

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}

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
  slug: string;
  description: string;
  category: 'indoor' | 'outdoor';
  image: string;
  basePrice: number;
  careInstructions: {
    sunlight: string;
    watering: string;
    humidity: string;
    temperature: string;
  };
  benefits: string[];
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Soil {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  benefits: string[];
  suitableFor: string[];
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pot {
  _id: string;
  name: string;
  slug: string;
  type: 'nursery' | 'gifting' | 'ceramic';
  description: string;
  basePrice: number;
  image: string;
  material: string;
  sizes: {
    small: { price: number; diameter: string; height: string; stock: number };
    medium: { price: number; diameter: string; height: string; stock: number };
    large: { price: number; diameter: string; height: string; stock: number };
  };
  features: string[];
  engravingOptions?: EngravingOption[];
  colors?: {
    name: string;
    hex: string;
    price: number;
    stock: number;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EngravingOption {
  type: 'sticker' | 'embossing';
  price: number;
  description: string;
  maxCharacters: number;
  availableLanguages: string[];
}

export interface PlantConfiguration {
  plant: Plant;
  soil: Soil;
  pot: Pot;
  potSize: 'small' | 'medium' | 'large';
  potColor?: string;
  engraving?: {
    option: EngravingOption;
    text: {
      line1: string;
      line2?: string;
    };
  };
  quantity: number;
  totalPrice: number;
}

export interface ConfigurationItem {
  plant?: Plant;
  soil?: Soil;
  pot?: Pot;
  potColor?: string;
  potSize?: 'small' | 'medium' | 'large';
  engraving?: {
    type: EngravingOption;
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
  userId: string;
  orderNumber: string;
  configurations: PlantConfiguration[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface StockAlert {
  _id: string;
  itemType: 'plant' | 'soil' | 'pot';
  itemId: string;
  itemName: string;
  currentStock: number;
  minimumStock: number;
  alertLevel: 'low' | 'critical' | 'out_of_stock';
  isActive: boolean;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
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
export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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
  status?: Order['status'];
  payment_status?: Order['paymentStatus'];
  date_from?: string;
  date_to?: string;
} 