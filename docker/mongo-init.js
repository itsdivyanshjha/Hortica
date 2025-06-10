// MongoDB initialization script for PlantBuilder
db = db.getSiblingDB('plantbuilder');

// Create admin user
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'plantbuilder'
    }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('plants');
db.createCollection('soils');
db.createCollection('pots');
db.createCollection('engravings');
db.createCollection('orders');
db.createCollection('configurations');

// Insert sample data for plants
db.plants.insertMany([
  {
    _id: ObjectId(),
    name: 'Fiddle Leaf Fig',
    category: 'indoor',
    description: 'A stunning indoor plant with large, glossy leaves perfect for brightening any room.',
    price: 2500,
    images: ['/images/plants/fiddle-leaf-fig-1.jpg', '/images/plants/fiddle-leaf-fig-2.jpg'],
    care_level: 'medium',
    light_requirement: 'bright indirect',
    watering_frequency: 'weekly',
    size: 'large',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Snake Plant',
    category: 'indoor',
    description: 'Low-maintenance plant perfect for beginners with striking upright leaves.',
    price: 1200,
    images: ['/images/plants/snake-plant-1.jpg', '/images/plants/snake-plant-2.jpg'],
    care_level: 'easy',
    light_requirement: 'low to bright indirect',
    watering_frequency: 'bi-weekly',
    size: 'medium',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Rose Bush',
    category: 'outdoor',
    description: 'Classic outdoor rose bush with fragrant blooms in various colors.',
    price: 3000,
    images: ['/images/plants/rose-bush-1.jpg', '/images/plants/rose-bush-2.jpg'],
    care_level: 'medium',
    light_requirement: 'full sun',
    watering_frequency: 'daily',
    size: 'large',
    created_at: new Date(),
    updated_at: new Date()
  }
]);

// Insert sample data for soils
db.soils.insertMany([
  {
    _id: ObjectId(),
    name: 'Premium Potting Mix',
    description: 'Well-draining mix perfect for indoor plants with organic nutrients.',
    price: 500,
    suitable_for: ['indoor', 'outdoor'],
    ingredients: ['peat moss', 'vermiculite', 'perlite', 'organic compost'],
    ph_level: '6.0-7.0',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Cactus & Succulent Mix',
    description: 'Fast-draining soil mix designed specifically for cacti and succulents.',
    price: 400,
    suitable_for: ['indoor'],
    ingredients: ['sand', 'perlite', 'pumice', 'organic matter'],
    ph_level: '6.5-7.5',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Garden Soil',
    description: 'Rich, organic soil perfect for outdoor gardens and larger plants.',
    price: 300,
    suitable_for: ['outdoor'],
    ingredients: ['topsoil', 'compost', 'organic matter', 'minerals'],
    ph_level: '6.0-7.5',
    created_at: new Date(),
    updated_at: new Date()
  }
]);

// Insert sample data for pots
db.pots.insertMany([
  {
    _id: ObjectId(),
    name: 'Ceramic White Pot',
    description: 'Elegant white ceramic pot with drainage holes.',
    price: 800,
    material: 'ceramic',
    colors: ['white', 'off-white'],
    sizes: ['small', 'medium', 'large'],
    drainage: true,
    weight: 1.2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Terracotta Classic',
    description: 'Traditional terracotta pot with natural clay finish.',
    price: 600,
    material: 'terracotta',
    colors: ['natural', 'rust'],
    sizes: ['small', 'medium', 'large'],
    drainage: true,
    weight: 1.5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Modern Black Planter',
    description: 'Sleek black planter with contemporary design.',
    price: 1200,
    material: 'fiber cement',
    colors: ['matte black', 'charcoal'],
    sizes: ['medium', 'large'],
    drainage: true,
    weight: 2.0,
    created_at: new Date(),
    updated_at: new Date()
  }
]);

// Insert sample data for engravings
db.engravings.insertMany([
  {
    _id: ObjectId(),
    name: 'Custom Text Engraving',
    description: 'Personalize your pot with custom text engraving.',
    price: 200,
    max_characters: 30,
    fonts: ['Arial', 'Times New Roman', 'Brush Script'],
    positions: ['center', 'bottom'],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    _id: ObjectId(),
    name: 'Symbol Engraving',
    description: 'Choose from a variety of symbols and icons.',
    price: 150,
    symbols: ['heart', 'star', 'leaf', 'sun', 'moon'],
    positions: ['center', 'bottom', 'side'],
    created_at: new Date(),
    updated_at: new Date()
  }
]);

print('PlantBuilder database initialized successfully!'); 