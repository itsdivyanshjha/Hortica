import mongoose, { Schema } from 'mongoose';
import { User as UserType, Address } from '@/types';

// Address subdocument schema
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

// User schema
const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  addresses: [AddressSchema],
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
UserSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

// Export the model
export default mongoose.models.User || mongoose.model<UserType>('User', UserSchema); 