import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
}

export const productService = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      // If no products found in Firestore, return sample data
      if (products.length === 0) {
        console.log('No products found in Firestore, returning sample data');
        return sampleProducts;
      }
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      console.log('Falling back to sample data due to Firestore error');
      return sampleProducts;
    }
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', category),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      // If no products found in Firestore, filter sample data
      if (products.length === 0) {
        console.log(`No products found in Firestore for category ${category}, filtering sample data`);
        return sampleProducts.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      return products;
    } catch (error) {
      console.error('Error getting products by category:', error);
      console.log(`Falling back to sample data for category ${category}`);
      return sampleProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Product;
      } else {
        // If not found in Firestore, check sample data
        const sampleProduct = sampleProducts.find(product => product.id === id);
        return sampleProduct || null;
      }
    } catch (error) {
      console.error('Error getting product:', error);
      // Fallback to sample data
      const sampleProduct = sampleProducts.find(product => product.id === id);
      return sampleProduct || null;
    }
  },

  // Search products
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      if (products.length === 0) {
        // If no products in Firestore, search sample data
        console.log('No products found in Firestore, searching sample data');
        return sampleProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching products:', error);
      console.log('Falling back to sample data for search');
      return sampleProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
};

// Sample products data for initial setup
export const sampleProducts: Product[] = [
  // Fruits Category
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'Fruits',
    description: 'Fresh organic bananas, perfect for smoothies or snacks. Rich in potassium and natural sweetness.',
    stock: 50,
  },
  {
    id: '2',
    name: 'Organic Avocados',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    description: 'Ripe organic avocados, perfect for guacamole, toast, or salads. Creamy and nutritious.',
    stock: 35,
  },
  {
    id: '3',
    name: 'Fresh Strawberries',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    category: 'Fruits',
    description: 'Sweet and juicy organic strawberries. Perfect for desserts, smoothies, or fresh eating.',
    stock: 30,
  },
  {
    id: '4',
    name: 'Organic Apples',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    category: 'Fruits',
    description: 'Crisp organic apples. Great for snacking, baking, or making fresh juice.',
    stock: 60,
  },
  {
    id: '5',
    name: 'Fresh Oranges',
    price: 2.79,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400',
    category: 'Fruits',
    description: 'Juicy fresh oranges packed with vitamin C. Perfect for juicing or fresh eating.',
    stock: 45,
  },
  {
    id: '6',
    name: 'Organic Blueberries',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
    category: 'Fruits',
    description: 'Antioxidant-rich organic blueberries. Great for smoothies, baking, or cereal topping.',
    stock: 25,
  },

  // Vegetables Category
  {
    id: '7',
    name: 'Fresh Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    description: 'Fresh organic spinach leaves, perfect for salads, smoothies, or cooking.',
    stock: 40,
  },
  {
    id: '8',
    name: 'Organic Carrots',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1447175008436-170170753886?w=400',
    category: 'Vegetables',
    description: 'Sweet organic carrots. Perfect for snacking, juicing, or cooking.',
    stock: 55,
  },
  {
    id: '9',
    name: 'Fresh Broccoli',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    category: 'Vegetables',
    description: 'Fresh organic broccoli florets. Great steamed, roasted, or in stir-fries.',
    stock: 35,
  },
  {
    id: '10',
    name: 'Organic Tomatoes',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    category: 'Vegetables',
    description: 'Ripe organic tomatoes. Perfect for salads, sandwiches, or cooking.',
    stock: 40,
  },
  {
    id: '11',
    name: 'Fresh Bell Peppers',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1525607551316-5a9e1c8b3c8c?w=400',
    category: 'Vegetables',
    description: 'Colorful organic bell peppers. Great for salads, stir-fries, or stuffing.',
    stock: 30,
  },
  {
    id: '12',
    name: 'Organic Onions',
    price: 1.79,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    category: 'Vegetables',
    description: 'Fresh organic onions. Essential for cooking and flavoring dishes.',
    stock: 50,
  },

  // Dairy Category
  {
    id: '13',
    name: 'Organic Milk',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    category: 'Dairy',
    description: 'Fresh organic whole milk from grass-fed cows. Rich and creamy.',
    stock: 30,
  },
  {
    id: '14',
    name: 'Free Range Eggs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    category: 'Dairy',
    description: 'Farm fresh free range eggs, 12 count. Perfect for breakfast or baking.',
    stock: 20,
  },
  {
    id: '15',
    name: 'Organic Greek Yogurt',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    category: 'Dairy',
    description: 'Creamy organic Greek yogurt. High in protein, perfect for breakfast or snacks.',
    stock: 25,
  },
  {
    id: '16',
    name: 'Aged Cheddar Cheese',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
    category: 'Dairy',
    description: 'Sharp aged cheddar cheese. Perfect for sandwiches, cooking, or cheese boards.',
    stock: 15,
  },
  {
    id: '17',
    name: 'Organic Butter',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    category: 'Dairy',
    description: 'Rich organic butter from grass-fed cows. Perfect for cooking and baking.',
    stock: 20,
  },

  // Meat Category
  {
    id: '18',
    name: 'Chicken Breast',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    category: 'Meat',
    description: 'Fresh boneless chicken breast, 1lb package. Lean and versatile protein.',
    stock: 15,
  },
  {
    id: '19',
    name: 'Ground Beef',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
    category: 'Meat',
    description: 'Premium ground beef, 1lb package. Perfect for burgers, meatballs, or tacos.',
    stock: 12,
  },
  {
    id: '20',
    name: 'Salmon Fillets',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    category: 'Meat',
    description: 'Fresh wild-caught salmon fillets. Rich in omega-3 fatty acids.',
    stock: 8,
  },
  {
    id: '21',
    name: 'Pork Chops',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
    category: 'Meat',
    description: 'Fresh pork chops, 4-pack. Tender and flavorful.',
    stock: 10,
  },

  // Bakery Category
  {
    id: '22',
    name: 'Whole Grain Bread',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'Bakery',
    description: 'Freshly baked whole grain bread with no preservatives. Nutritious and delicious.',
    stock: 25,
  },
  {
    id: '23',
    name: 'Croissants',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f4ade2a?w=400',
    category: 'Bakery',
    description: 'Buttery flaky croissants. Perfect for breakfast or brunch.',
    stock: 20,
  },
  {
    id: '24',
    name: 'Chocolate Chip Cookies',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    category: 'Bakery',
    description: 'Fresh baked chocolate chip cookies. Soft and chewy with real chocolate chips.',
    stock: 30,
  },
  {
    id: '25',
    name: 'Sourdough Bread',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400',
    category: 'Bakery',
    description: 'Artisan sourdough bread. Tangy flavor with a crispy crust.',
    stock: 15,
  },

  // Grains Category
  {
    id: '26',
    name: 'Brown Rice',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    category: 'Grains',
    description: 'Organic brown rice, 2lb bag. Nutritious whole grain option.',
    stock: 45,
  },
  {
    id: '27',
    name: 'Quinoa',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    category: 'Grains',
    description: 'Organic quinoa, 1lb package. High-protein ancient grain.',
    stock: 25,
  },
  {
    id: '28',
    name: 'Oatmeal',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400',
    category: 'Grains',
    description: 'Steel-cut organic oatmeal. Perfect for a healthy breakfast.',
    stock: 35,
  },
  {
    id: '29',
    name: 'Whole Wheat Pasta',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400',
    category: 'Grains',
    description: 'Organic whole wheat pasta. Nutritious alternative to regular pasta.',
    stock: 40,
  },

  // Beverages Category
  {
    id: '30',
    name: 'Organic Orange Juice',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    category: 'Beverages',
    description: 'Fresh squeezed organic orange juice. No added sugars or preservatives.',
    stock: 20,
  },
  {
    id: '31',
    name: 'Green Tea',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    category: 'Beverages',
    description: 'Premium organic green tea. Antioxidant-rich and refreshing.',
    stock: 30,
  },
  {
    id: '32',
    name: 'Coconut Water',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    category: 'Beverages',
    description: 'Natural coconut water. Hydrating and electrolyte-rich.',
    stock: 25,
  },

  // Snacks Category
  {
    id: '33',
    name: 'Mixed Nuts',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
    category: 'Snacks',
    description: 'Premium mixed nuts. Almonds, cashews, walnuts, and pecans.',
    stock: 20,
  },
  {
    id: '34',
    name: 'Organic Popcorn',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Snacks',
    description: 'Light and fluffy organic popcorn. Perfect healthy snack.',
    stock: 35,
  },
  {
    id: '35',
    name: 'Dark Chocolate',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400',
    category: 'Snacks',
    description: '70% dark chocolate bar. Rich and indulgent with health benefits.',
    stock: 30,
  },

  // Frozen Foods Category
  {
    id: '36',
    name: 'Frozen Berries',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
    category: 'Frozen Foods',
    description: 'Mixed frozen berries. Perfect for smoothies, baking, or desserts.',
    stock: 25,
  },
  {
    id: '37',
    name: 'Frozen Pizza',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    category: 'Frozen Foods',
    description: 'Margherita frozen pizza. Quick and delicious meal option.',
    stock: 15,
  },
  {
    id: '38',
    name: 'Ice Cream',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    category: 'Frozen Foods',
    description: 'Vanilla bean ice cream. Creamy and indulgent dessert.',
    stock: 20,
  },

  // Pantry Category
  {
    id: '39',
    name: 'Extra Virgin Olive Oil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    category: 'Pantry',
    description: 'Premium extra virgin olive oil. Perfect for cooking and dressings.',
    stock: 30,
  },
  {
    id: '40',
    name: 'Organic Honey',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
    category: 'Pantry',
    description: 'Pure organic honey. Natural sweetener with health benefits.',
    stock: 25,
  },
  {
    id: '41',
    name: 'Sea Salt',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400',
    category: 'Pantry',
    description: 'Fine sea salt. Essential seasoning for all your cooking needs.',
    stock: 40,
  },
  {
    id: '42',
    name: 'Organic Black Pepper',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400',
    category: 'Pantry',
    description: 'Freshly ground organic black pepper. Adds flavor to any dish.',
    stock: 35,
  },
];
