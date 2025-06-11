import mongoose, { Schema, Document } from 'mongoose';
import { StockAlert } from '@/types';

interface StockAlertDocument extends Omit<StockAlert, '_id'>, Document {}

const stockAlertSchema = new Schema<StockAlertDocument>(
  {
    itemType: {
      type: String,
      enum: ['plant', 'soil', 'pot'],
      required: [true, 'Item type is required'],
    },
    itemId: {
      type: String,
      required: [true, 'Item ID is required'],
    },
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
    },
    currentStock: {
      type: Number,
      required: [true, 'Current stock is required'],
      min: [0, 'Stock cannot be negative'],
    },
    minimumStock: {
      type: Number,
      required: [true, 'Minimum stock is required'],
      min: [0, 'Minimum stock cannot be negative'],
    },
    alertLevel: {
      type: String,
      enum: ['low', 'critical', 'out_of_stock'],
      required: [true, 'Alert level is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
stockAlertSchema.index({ itemType: 1, itemId: 1 });
stockAlertSchema.index({ alertLevel: 1 });
stockAlertSchema.index({ isActive: 1 });

export default mongoose.models.StockAlert || mongoose.model<StockAlertDocument>('StockAlert', stockAlertSchema); 