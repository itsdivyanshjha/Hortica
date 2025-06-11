#!/usr/bin/env node

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import the initialization function
const { initializeDatabase } = require('../src/lib/init-database.ts');

async function runInitialization() {
  try {
    console.log('🌱 Starting database initialization...');
    
    const result = await initializeDatabase();
    
    console.log('✅ Database initialization completed!');
    console.log(`📊 Summary:`, result.data);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

runInitialization(); 