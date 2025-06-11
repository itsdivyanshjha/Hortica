import connectToDatabase from './mongodb';
import Plant from '@/models/Plant';
import Soil from '@/models/Soil';
import Pot from '@/models/Pot';
import StockAlert from '@/models/StockAlert';

// Sample plant data
const plantsData = [
  {
    name: 'Variegated Snake Plant',
    slug: 'variegated-snake-plant',
    description: 'The Variegated Snake Plant (Sansevieria trifasciata) is a stunning indoor plant known for its striking yellow-edged leaves and remarkable air-purifying qualities. Perfect for beginners and busy plant parents.',
    category: 'indoor' as const,
    image: '/images/plants/Variegated-Snake-Plant.jpg',
    basePrice: 1299,
    careInstructions: {
      sunlight: 'Low to bright indirect light',
      watering: 'Water every 2-3 weeks, allow soil to dry completely',
      humidity: '30-50% (average household humidity)',
      temperature: '65-85°F (18-29°C)'
    },
    benefits: [
      'Excellent air purifier',
      'Releases oxygen at night',
      'Low maintenance',
      'Drought tolerant',
      'Pet-friendly (mildly toxic if ingested)'
    ],
    stock: 25,
    isActive: true
  },
  {
    name: 'Bamboo Palm',
    slug: 'bamboo-palm',
    description: 'The Bamboo Palm (Chamaedorea seifrizii) is an elegant indoor palm that brings tropical vibes to any space. Known for its graceful fronds and excellent air-purifying abilities.',
    category: 'indoor' as const,
    image: '/images/plants/Bamboo-Palm.jpg',
    basePrice: 1899,
    careInstructions: {
      sunlight: 'Bright indirect light, can tolerate low light',
      watering: 'Keep soil consistently moist but not waterlogged',
      humidity: '40-60% (moderate to high humidity)',
      temperature: '65-80°F (18-27°C)'
    },
    benefits: [
      'Superior air purification',
      'Natural humidifier',
      'Non-toxic to pets',
      'Adds tropical ambiance',
      'Removes formaldehyde and benzene'
    ],
    stock: 18,
    isActive: true
  }
];

// Sample soil data
const soilsData = [
  {
    name: 'Premium Nutrient Mix',
    slug: 'premium-nutrient-mix',
    description: 'Our premium nutrient-rich potting mix specially formulated for indoor plants. Contains organic compost, perlite, and essential nutrients for optimal plant growth.',
    price: 299,
    benefits: [
      'Rich in organic nutrients',
      'Excellent drainage',
      'pH balanced',
      'Promotes root growth',
      'Contains beneficial microorganisms'
    ],
    suitableFor: ['indoor plants', 'houseplants', 'succulents', 'herbs'],
    stock: 50,
    isActive: true
  },
  {
    name: 'Coco Peat Premium',
    slug: 'coco-peat-premium',
    description: 'Eco-friendly coco peat substrate made from coconut fiber. Excellent water retention and aeration properties make it perfect for most indoor plants.',
    price: 199,
    benefits: [
      'Excellent water retention',
      'Sustainable and eco-friendly',
      'Natural pH buffering',
      'Prevents soil compaction',
      'Biodegradable'
    ],
    suitableFor: ['tropical plants', 'palms', 'ferns', 'orchids'],
    stock: 75,
    isActive: true
  },
  {
    name: 'Organic Manure Mix',
    slug: 'organic-manure-mix',
    description: 'Well-composted organic manure blend enriched with natural nutrients. Perfect for plants that need rich, fertile soil for vigorous growth.',
    price: 249,
    benefits: [
      'Rich in organic matter',
      'Slow-release nutrients',
      'Improves soil structure',
      'Enhances microbial activity',
      '100% organic and chemical-free'
    ],
    suitableFor: ['flowering plants', 'vegetable gardens', 'fruit plants', 'herbs'],
    stock: 40,
    isActive: true
  }
];

// Sample pot data with engraving options
const potsData = [
  {
    name: 'Nursery Pot',
    slug: 'nursery-pot',
    type: 'nursery' as const,
    description: 'Professional-grade nursery pots perfect for plant growth and transplanting. Lightweight, durable, and designed for optimal root development.',
    basePrice: 49,
    image: '/images/pots/Nursery_Pot.jpg',
    material: 'High-quality plastic',
    sizes: {
      small: { price: 49, diameter: '4 inch', height: '4 inch', stock: 100 },
      medium: { price: 79, diameter: '6 inch', height: '6 inch', stock: 75 },
      large: { price: 129, diameter: '8 inch', height: '8 inch', stock: 50 }
    },
    features: [
      'Drainage holes',
      'Lightweight',
      'UV resistant',
      'Easy to clean',
      'Stackable design'
    ],
    colors: [
      { name: 'Black', hex: '#000000', price: 0, stock: 100 },
      { name: 'Terracotta', hex: '#CD853F', price: 0, stock: 80 }
    ],
    isActive: true
  },
  {
    name: 'Premium Gifting Pot',
    slug: 'premium-gifting-pot',
    type: 'gifting' as const,
    description: 'Elegant decorative pots perfect for gifting. These beautiful pots come with personalization options to make your gift truly special.',
    basePrice: 599,
    image: '/images/pots/Gifting_Pot.jpg',
    material: 'Premium ceramic with glossy finish',
    sizes: {
      small: { price: 599, diameter: '5 inch', height: '5 inch', stock: 30 },
      medium: { price: 899, diameter: '7 inch', height: '7 inch', stock: 25 },
      large: { price: 1299, diameter: '9 inch', height: '9 inch', stock: 15 }
    },
    features: [
      'Premium ceramic finish',
      'Drainage system',
      'Gift-ready packaging',
      'Personalization available',
      'Scratch-resistant surface'
    ],
    engravingOptions: [
      {
        type: 'sticker' as const,
        price: 99,
        description: 'Premium vinyl stickers with custom text. Weather-resistant and long-lasting.',
        maxCharacters: 50,
        availableLanguages: ['English', 'Hindi', 'Sanskrit', 'Gujarati', 'Marathi', 'Tamil', 'Telugu']
      },
      {
        type: 'embossing' as const,
        price: 199,
        description: 'Elegant embossed engraving directly onto the pot surface. Permanent and sophisticated.',
        maxCharacters: 30,
        availableLanguages: ['English', 'Hindi', 'Sanskrit', 'Gujarati', 'Marathi', 'Tamil', 'Telugu']
      }
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', price: 0, stock: 40 },
      { name: 'Sage Green', hex: '#9CAF88', price: 50, stock: 30 },
      { name: 'Soft Pink', hex: '#F4C2C2', price: 50, stock: 25 }
    ],
    isActive: true
  },
  {
    name: 'Artisan Ceramic Pot',
    slug: 'artisan-ceramic-pot',
    type: 'ceramic' as const,
    description: 'Handcrafted ceramic pots with artistic designs. Each pot is unique and can be personalized with custom engravings for a truly one-of-a-kind piece.',
    basePrice: 899,
    image: '/images/pots/Ceramic_Pot.jpg',
    material: 'Hand-thrown ceramic with artisan glaze',
    sizes: {
      small: { price: 899, diameter: '5.5 inch', height: '5.5 inch', stock: 20 },
      medium: { price: 1399, diameter: '7.5 inch', height: '7.5 inch', stock: 15 },
      large: { price: 1899, diameter: '10 inch', height: '10 inch', stock: 10 }
    },
    features: [
      'Handcrafted ceramic',
      'Unique artistic patterns',
      'Professional drainage',
      'Food-safe glaze',
      'Microwave and dishwasher safe'
    ],
    engravingOptions: [
      {
        type: 'sticker' as const,
        price: 149,
        description: 'Premium artistic stickers designed to complement the ceramic finish.',
        maxCharacters: 40,
        availableLanguages: ['English', 'Hindi', 'Sanskrit', 'Gujarati', 'Marathi', 'Tamil', 'Telugu']
      },
      {
        type: 'embossing' as const,
        price: 299,
        description: 'Hand-carved embossing by skilled artisans. A permanent work of art on your pot.',
        maxCharacters: 25,
        availableLanguages: ['English', 'Hindi', 'Sanskrit', 'Gujarati', 'Marathi', 'Tamil', 'Telugu']
      }
    ],
    colors: [
      { name: 'Natural Clay', hex: '#D2B48C', price: 0, stock: 30 },
      { name: 'Ocean Blue', hex: '#4F94CD', price: 100, stock: 20 },
      { name: 'Forest Green', hex: '#228B22', price: 100, stock: 18 },
      { name: 'Sunset Orange', hex: '#FF8C00', price: 100, stock: 15 }
    ],
    isActive: true
  }
];

export default async function initializeDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    // Clear existing data (optional - remove in production)
    await Plant.deleteMany({});
    await Soil.deleteMany({});
    await Pot.deleteMany({});
    await StockAlert.deleteMany({});
    console.log('Cleared existing data');

    // Insert plants
    const plants = await Plant.insertMany(plantsData);
    console.log(`Inserted ${plants.length} plants`);

    // Insert soils
    const soils = await Soil.insertMany(soilsData);
    console.log(`Inserted ${soils.length} soil types`);

    // Insert pots
    const pots = await Pot.insertMany(potsData);
    console.log(`Inserted ${pots.length} pot types`);

    // Create stock alerts for low inventory items
    const stockAlerts = [];
    
    // Check plants with low stock
    for (const plant of plants) {
      if (plant.stock < 20) {
        stockAlerts.push({
          itemType: 'plant',
          itemId: plant._id.toString(),
          itemName: plant.name,
          currentStock: plant.stock,
          minimumStock: 20,
          alertLevel: plant.stock < 10 ? 'critical' : 'low',
          isActive: true
        });
      }
    }

    // Check soils with low stock
    for (const soil of soils) {
      if (soil.stock < 30) {
        stockAlerts.push({
          itemType: 'soil',
          itemId: soil._id.toString(),
          itemName: soil.name,
          currentStock: soil.stock,
          minimumStock: 30,
          alertLevel: soil.stock < 15 ? 'critical' : 'low',
          isActive: true
        });
      }
    }

    // Check pots with low stock
    for (const pot of pots) {
      const totalStock = pot.sizes.small.stock + pot.sizes.medium.stock + pot.sizes.large.stock;
      if (totalStock < 50) {
        stockAlerts.push({
          itemType: 'pot',
          itemId: pot._id.toString(),
          itemName: pot.name,
          currentStock: totalStock,
          minimumStock: 50,
          alertLevel: totalStock < 25 ? 'critical' : 'low',
          isActive: true
        });
      }
    }

    if (stockAlerts.length > 0) {
      await StockAlert.insertMany(stockAlerts);
      console.log(`Created ${stockAlerts.length} stock alerts`);
    }

    console.log('Database initialization completed successfully!');
    
    return {
      success: true,
      message: 'Database initialized successfully',
      data: {
        plants: plants.length,
        soils: soils.length,
        pots: pots.length,
        stockAlerts: stockAlerts.length
      }
    };

  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Also export as named export for flexibility
export { initializeDatabase }; 