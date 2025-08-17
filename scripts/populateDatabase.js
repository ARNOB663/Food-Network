const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc } = require('firebase/firestore');

// Your Firebase config
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
    id: '1',
    name: 'Fresh Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'Fruits',
    description: 'Fresh organic bananas, perfect for smoothies or snacks.',
    stock: 50,
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'Bakery',
    description: 'Freshly baked whole grain bread with no preservatives.',
    stock: 25,
  },
  {
    id: '3',
    name: 'Fresh Milk (1L)',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    category: 'Dairy',
    description: 'Fresh whole milk from local farms.',
    stock: 30,
  },
  {
    id: '4',
    name: 'Organic Carrots',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'Vegetables',
    description: 'Fresh organic carrots, great for cooking or snacking.',
    stock: 40,
  },
  {
    id: '5',
    name: 'Free Range Chicken Breast',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    category: 'Meat',
    description: 'Premium free-range chicken breast, hormone-free.',
    stock: 15,
  },
  {
    id: '6',
    name: 'Red Apples (1kg)',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    category: 'Fruits',
    description: 'Crispy red apples, perfect for snacking or baking.',
    stock: 60,
  },
  {
    id: '7',
    name: 'Fresh Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    description: 'Fresh baby spinach leaves, great for salads.',
    stock: 35,
  },
  {
    id: '8',
    name: 'Cheddar Cheese Block',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
    category: 'Dairy',
    description: 'Aged cheddar cheese block, perfect for sandwiches.',
    stock: 20,
  },
  {
    id: '9',
    name: 'Brown Rice (2kg)',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    category: 'Grains',
    description: 'Premium brown rice, high in fiber and nutrients.',
    stock: 25,
  },
  {
    id: '10',
    name: 'Croissants (Pack of 6)',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f575c1f?w=400',
    category: 'Bakery',
    description: 'Buttery croissants, freshly baked every morning.',
    stock: 18,
  },
  {
    id: '11',
    name: 'Salmon Fillet',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1574781330855-d0db2706b2d8?w=400',
    category: 'Meat',
    description: 'Fresh Atlantic salmon fillet, rich in omega-3.',
    stock: 12,
  },
  {
    id: '12',
    name: 'Greek Yogurt (500g)',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    category: 'Dairy',
    description: 'Creamy Greek yogurt, high in protein.',
    stock: 28,
  },
  {
    id: '13',
    name: 'Orange Juice (1L)',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    category: 'Fruits',
    description: 'Freshly squeezed orange juice, no added sugar.',
    stock: 22,
  },
  {
    id: '14',
    name: 'Broccoli',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    category: 'Vegetables',
    description: 'Fresh broccoli crowns, packed with vitamins.',
    stock: 30,
  },
  {
    id: '15',
    name: 'Quinoa (1kg)',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1586244439413-bc2288941dda?w=400',
    category: 'Grains',
    description: 'Organic quinoa, a complete protein source.',
    stock: 20,
  }
];

async function populateDatabase() {
  try {
    console.log('Starting to populate database...');
    
    // Add products to Firestore
    for (const product of sampleProducts) {
      const { id, ...productData } = product;
      await setDoc(doc(db, 'products', id), productData);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('\n✅ Database populated successfully!');
    console.log(`Added ${sampleProducts.length} products to the database.`);
    
  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

// Run the script
populateDatabase();
