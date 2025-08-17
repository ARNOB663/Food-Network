import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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
  },
  {
    name: 'Salmon Fillet',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1574781330855-d0db2706b2d8?w=400',
    category: 'Meat',
    description: 'Fresh Atlantic salmon fillet, rich in omega-3.',
    stock: 12,
  },
  {
    name: 'Greek Yogurt (500g)',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    category: 'Dairy',
    description: 'Creamy Greek yogurt, high in protein.',
    stock: 28,
  },
];

export const DatabaseSeeder: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const populateDatabase = async () => {
    setIsLoading(true);
    try {
      console.log('Starting to populate database...');
      
      for (let i = 0; i < sampleProducts.length; i++) {
        const product = sampleProducts[i];
        const productId = `product_${i + 1}`;
        
        await setDoc(doc(db, 'products', productId), {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        console.log(`Added product: ${product.name}`);
      }
      
      Alert.alert(
        'Success!', 
        `Successfully added ${sampleProducts.length} products to the database.`,
        [{ text: 'OK' }]
      );
      
      console.log('✅ Database populated successfully!');
      
    } catch (error) {
      console.error('❌ Error populating database:', error);
      Alert.alert(
        'Error', 
        'Failed to populate database. Check console for details.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Database Seeder</Text>
      <Text style={styles.description}>
        This will add {sampleProducts.length} sample products to your Firestore database.
      </Text>
      
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={populateDatabase}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Adding Products...' : 'Populate Database'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.warning}>
        ⚠️ Warning: This will add data to your live database. Remove this component after use.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  warning: {
    fontSize: 12,
    color: '#e74c3c',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
