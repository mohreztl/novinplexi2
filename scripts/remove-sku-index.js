// Script to remove the sku index from MongoDB
// Run this with: node scripts/remove-sku-index.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const removeSkuIndex = async () => {
  try {
    // Connect to MongoDB using the same URI as the app
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/my-app';
    console.log('Connecting to:', mongoUri.replace(/:[^@]*@/, ':***@')); // Hide password in log
    
    await mongoose.connect(mongoUri);
    
    console.log('Connected to MongoDB');
    
    // Get the products collection
    const db = mongoose.connection.db;
    console.log('Database name:', db.databaseName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    const collection = db.collection('products');
    
    // Check if collection exists and has documents
    const count = await collection.countDocuments();
    console.log(`Products collection has ${count} documents`);
    
    if (count === 0) {
      console.log('❌ Products collection is empty or does not exist');
      return;
    }
    
    // List all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(idx => idx.name));
    
    // Check if sku_1 index exists
    const skuIndexExists = indexes.some(idx => idx.name === 'sku_1');
    
    if (skuIndexExists) {
      // Drop the sku_1 index
      await collection.dropIndex('sku_1');
      console.log('✅ Successfully removed sku_1 index');
    } else {
      console.log('❌ sku_1 index does not exist');
    }
    
    // List indexes after removal
    const newIndexes = await collection.indexes();
    console.log('Indexes after removal:', newIndexes.map(idx => idx.name));
    
  } catch (error) {
    console.error('Error removing sku index:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

removeSkuIndex();