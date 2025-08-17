#!/usr/bin/env node

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7JPXMLpnfsXHI9j19K3ymLqWZlWJEiM0",
  authDomain: "foodnetwork-83c20.firebaseapp.com",
  projectId: "foodnetwork-83c20",
  storageBucket: "foodnetwork-83c20.firebasestorage.app",
  messagingSenderId: "1026221553136",
  appId: "1:1026221553136:android:101a6feb9711e617fe9935"
};

// Sample products data (first 10 products for demo)
const sampleProducts = [
  {
    name: 'Fresh Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'Fruits',
    description: 'Fresh organic bananas, perfect for smoothies or snacks.',
    stock: 50,
  },
  {
    name: 'Organic Avocados',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    description: 'Ripe organic avocados, perfect for guacamole or salads.',
    stock: 35,
  },
  {
    name: 'Fresh Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    description: 'Fresh organic spinach leaves, perfect for salads.',
    stock: 40,
  },
  {
    name: 'Organic Milk',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    category: 'Dairy',
    description: 'Fresh organic whole milk from grass-fed cows.',
    stock: 30,
  },
  {
    name: 'Chicken Breast',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    category: 'Meat',
    description: 'Fresh boneless chicken breast, 1lb package.',
    stock: 15,
  },
  {
    name: 'Whole Grain Bread',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'Bakery',
    description: 'Freshly baked whole grain bread with no preservatives.',
    stock: 25,
  },
  {
    name: 'Brown Rice',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    category: 'Grains',
    description: 'Organic brown rice, 2lb bag.',
    stock: 45,
  },
  {
    name: 'Organic Orange Juice',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    category: 'Beverages',
    description: 'Fresh squeezed organic orange juice.',
    stock: 20,
  },
  {
    name: 'Mixed Nuts',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
    category: 'Snacks',
    description: 'Premium mixed nuts. Almonds, cashews, walnuts.',
    stock: 20,
  },
  {
    name: 'Extra Virgin Olive Oil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    category: 'Pantry',
    description: 'Premium extra virgin olive oil.',
    stock: 30,
  },
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function populateDatabase() {
  console.log('🚀 Starting database population...\n');

  try {
    const productsRef = collection(db, 'products');
    let successCount = 0;

    for (const product of sampleProducts) {
      try {
        await addDoc(productsRef, {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        successCount++;
        console.log(`✅ Added: ${product.name}`);
      } catch (error) {
        console.error(`❌ Failed to add ${product.name}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully added ${successCount} products to database!`);

  } catch (error) {
    console.error('💥 Database population failed:', error.message);
  }
}

populateDatabase();
