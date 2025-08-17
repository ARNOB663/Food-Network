import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Your Firebase config (same as in your app)
const firebaseConfig = {
  apiKey: "AIzaSyB7JPXMLpnfsXHI9j19K3ymLqWZlWJEiM0",
  authDomain: "foodnetwork-83c20.firebaseapp.com",
  projectId: "foodnetwork-83c20",
  storageBucket: "foodnetwork-83c20.firebasestorage.app",
  messagingSenderId: "1026221553136",
  appId: "1:1026221553136:android:101a6feb9711e617fe9935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample products data
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
    name: 'Whole Grain Bread',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'Bakery',
    description: 'Freshly baked whole grain bread with no preservatives.',
    stock: 25,
  },
  {
    name: 'Fresh Milk (1L)',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    category: 'Dairy',
    description: 'Fresh whole milk from local farms.',
    stock: 30,
  },
  {
    name: 'Organic Carrots',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'Vegetables',
    description: 'Fresh organic carrots, great for cooking or snacking.',
    stock: 40,
  },
  {
    name: 'Free Range Chicken Breast',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    category: 'Meat',
    description: 'Premium free-range chicken breast, hormone-free.',
    stock: 15,
  },
  {
    name: 'Red Apples (1kg)',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    category: 'Fruits',
    description: 'Crispy red apples, perfect for snacking or baking.',
    stock: 60,
  },
  {
    name: 'Fresh Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    description: 'Fresh baby spinach leaves, great for salads.',
    stock: 35,
  },
  {
    name: 'Cheddar Cheese Block',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
    category: 'Dairy',
    description: 'Aged cheddar cheese block, perfect for sandwiches.',
    stock: 20,
  },
  {
    name: 'Brown Rice (2kg)',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    category: 'Grains',
    description: 'Premium brown rice, high in fiber and nutrients.',
    stock: 25,
  },
  {
    name: 'Croissants (Pack of 6)',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f575c1f?w=400',
    category: 'Bakery',
    description: 'Buttery croissants, freshly baked every morning.',
    stock: 18,
  }
];

export const populateDatabase = async () => {
  try {
    console.log('Starting to populate database...');
    
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = sampleProducts[i];
      const productId = `product_${i + 1}`;
      
      await setDoc(doc(db, 'products', productId), product);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('\n✅ Database populated successfully!');
    console.log(`Added ${sampleProducts.length} products to the database.`);
    
    return true;
  } catch (error) {
    console.error('❌ Error populating database:', error);
    return false;
  }
};
