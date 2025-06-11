import mongoose, { Schema, Document } from 'mongoose';
import { Plant } from '@/types';

interface PlantDocument extends Omit<Plant, '_id'>, Document {}

const plantSchema = new Schema<PlantDocument>(
  {
    name: {
      type: String,
      required: [true, 'Plant name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Plant slug is required'],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Plant description is required'],
    },
    category: {
      type: String,
      enum: ['indoor', 'outdoor'],
      required: [true, 'Plant category is required'],
    },
    image: {
      type: String,
      required: [true, 'Plant image is required'],
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative'],
    },
    careInstructions: {
      sunlight: {
        type: String,
        required: true,
      },
      watering: {
        type: String,
        required: true,
      },
      humidity: {
        type: String,
        required: true,
      },
      temperature: {
        type: String,
        required: true,
      },
    },
    benefits: [
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
plantSchema.index({ slug: 1 });
plantSchema.index({ category: 1 });
plantSchema.index({ isActive: 1 });

export default mongoose.models.Plant || mongoose.model<PlantDocument>('Plant', plantSchema); 