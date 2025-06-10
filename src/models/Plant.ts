import mongoose, { Schema } from 'mongoose';
import { Plant as PlantType } from '@/types';

const PlantSchema = new Schema<PlantType>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  category: {
    type: String,
    enum: ['indoor', 'outdoor'],
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [{
    type: String,
    required: true,
  }],
  care_level: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  light_requirement: {
    type: String,
    required: true,
    maxlength: 100,
  },
  watering_frequency: {
    type: String,
    required: true,
    maxlength: 100,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
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
PlantSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

// Index for search optimization
PlantSchema.index({ name: 'text', description: 'text' });
PlantSchema.index({ category: 1, care_level: 1, size: 1 });

export default mongoose.models.Plant || mongoose.model<PlantType>('Plant', PlantSchema); 