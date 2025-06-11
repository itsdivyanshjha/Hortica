import mongoose, { Schema, Document } from 'mongoose';
import { Pot, EngravingOption } from '@/types';

interface PotDocument extends Omit<Pot, '_id'>, Document {}

const engravingOptionSchema = new Schema<EngravingOption>({
  type: {
    type: String,
    enum: ['sticker', 'embossing'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  maxCharacters: {
    type: Number,
    required: true,
    min: 1,
  },
  availableLanguages: [
    {
      type: String,
      required: true,
    },
  ],
});

const potSchema = new Schema<PotDocument>(
  {
    name: {
      type: String,
      required: [true, 'Pot name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Pot slug is required'],
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['nursery', 'gifting', 'ceramic'],
      required: [true, 'Pot type is required'],
    },
    description: {
      type: String,
      required: [true, 'Pot description is required'],
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Pot image is required'],
    },
    material: {
      type: String,
      required: [true, 'Pot material is required'],
    },
    sizes: {
      small: {
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        diameter: {
          type: String,
          required: true,
        },
        height: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
      },
      medium: {
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        diameter: {
          type: String,
          required: true,
        },
        height: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
      },
      large: {
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        diameter: {
          type: String,
          required: true,
        },
        height: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
      },
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    engravingOptions: [engravingOptionSchema],
    colors: [
      {
        name: {
          type: String,
          required: true,
        },
        hex: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
      },
    ],
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
potSchema.index({ slug: 1 });
potSchema.index({ type: 1 });
potSchema.index({ isActive: 1 });

export default mongoose.models.Pot || mongoose.model<PotDocument>('Pot', potSchema); 