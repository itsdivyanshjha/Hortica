import mongoose, { Schema } from 'mongoose';
import { Order as OrderType, CartItem, Address } from '@/types';

// Address subdocument schema (reused from User model)
const AddressSchema = new Schema<Address>({
  type: {
    type: String,
    enum: ['home', 'work', 'other'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  street: {
    type: String,
    required: true,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    maxlength: 100,
  },
  postal_code: {
    type: String,
    required: true,
    maxlength: 20,
  },
  country: {
    type: String,
    required: true,
    maxlength: 100,
    default: 'India',
  },
  is_default: {
    type: Boolean,
    default: false,
  },
});

// Configuration Item subdocument schema
const ConfigurationItemSchema = new Schema({
  plant: {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    category: { type: String, enum: ['indoor', 'outdoor'], required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
  },
  soil: {
    _id: { type: Schema.Types.ObjectId },
    name: { type: String },
    price: { type: Number },
    description: { type: String },
  },
  pot: {
    _id: { type: Schema.Types.ObjectId },
    name: { type: String },
    price: { type: Number },
    material: { type: String },
  },
  potColor: { type: String },
  potSize: { type: String, enum: ['small', 'medium', 'large'] },
  engraving: {
    type: {
      _id: { type: Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
    },
    text: { type: String },
    symbol: { type: String },
    font: { type: String },
    position: { type: String },
  },
});

// Cart Item subdocument schema
const CartItemSchema = new Schema<CartItem>({
  _id: {
    type: String,
    required: true,
  },
  configuration: {
    type: ConfigurationItemSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0,
  },
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Order schema
const OrderSchema = new Schema<OrderType>({
  user_id: {
    type: String,
    required: true,
    index: true,
  },
  items: [CartItemSchema],
  shipping_address: {
    type: AddressSchema,
    required: true,
  },
  billing_address: {
    type: AddressSchema,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ['stripe', 'paytm', 'cod'],
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  order_status: {
    type: String,
    enum: ['received', 'preparing', 'shipped', 'delivered', 'cancelled'],
    default: 'received',
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  shipping_fee: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  tax_amount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0,
  },
  stripe_payment_intent_id: {
    type: String,
  },
  tracking_number: {
    type: String,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update the updated_at field before saving
OrderSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

// Indexes for efficient queries
OrderSchema.index({ user_id: 1, created_at: -1 });
OrderSchema.index({ order_status: 1 });
OrderSchema.index({ payment_status: 1 });
OrderSchema.index({ created_at: -1 });

export default mongoose.models.Order || mongoose.model<OrderType>('Order', OrderSchema); 