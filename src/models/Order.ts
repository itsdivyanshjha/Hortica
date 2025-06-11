import mongoose, { Schema, Document } from 'mongoose';
import { Order, PlantConfiguration } from '@/types';

interface OrderDocument extends Omit<Order, '_id'>, Document {}

const plantConfigurationSchema = new Schema({
  plant: {
    type: Schema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  },
  soil: {
    type: Schema.Types.ObjectId,
    ref: 'Soil',
    required: true,
  },
  pot: {
    type: Schema.Types.ObjectId,
    ref: 'Pot',
    required: true,
  },
  potSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  potColor: {
    type: String,
  },
  engraving: {
    option: {
      type: {
        type: String,
        enum: ['sticker', 'embossing'],
      },
      price: Number,
      description: String,
      maxCharacters: Number,
      availableLanguages: [String],
    },
    text: {
      line1: {
        type: String,
        required: true,
      },
      line2: String,
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    orderNumber: {
      type: String,
      required: [true, 'Order number is required'],
      unique: true,
    },
    configurations: [plantConfigurationSchema],
    subtotal: {
      type: Number,
      required: [true, 'Subtotal is required'],
      min: [0, 'Subtotal cannot be negative'],
    },
    tax: {
      type: Number,
      required: [true, 'Tax is required'],
      min: [0, 'Tax cannot be negative'],
    },
    shipping: {
      type: Number,
      required: [true, 'Shipping is required'],
      min: [0, 'Shipping cannot be negative'],
    },
    total: {
      type: Number,
      required: [true, 'Total is required'],
      min: [0, 'Total cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: 'India',
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
orderSchema.index({ userId: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

export default mongoose.models.Order || mongoose.model<OrderDocument>('Order', orderSchema); 