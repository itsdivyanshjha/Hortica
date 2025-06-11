import mongoose, { Schema, Document } from 'mongoose';
import { Soil } from '@/types';

interface SoilDocument extends Omit<Soil, '_id'>, Document {}

const soilSchema = new Schema<SoilDocument>(
  {
    name: {
      type: String,
      required: [true, 'Soil name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Soil slug is required'],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Soil description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
    },
    benefits: [
      {
        type: String,
        required: true,
      },
    ],
    suitableFor: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
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
soilSchema.index({ slug: 1 });
soilSchema.index({ isActive: 1 });

export default mongoose.models.Soil || mongoose.model<SoilDocument>('Soil', soilSchema); 