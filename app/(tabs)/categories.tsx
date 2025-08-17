import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Platform,
} from 'react-native';
import { useCart } from '../../components/CartContext';
import { useNotification } from '../../components/NotificationContext';
import { productService, sampleProducts } from '../../services/productService';
import { router } from 'expo-router';

const categories = [
  { id: '1', name: 'Fruits', icon: '🍎', color: '#e74c3c' },
  { id: '2', name: 'Vegetables', icon: '🥬', color: '#27ae60' },
  { id: '3', name: 'Dairy', icon: '🥛', color: '#3498db' },
  { id: '4', name: 'Meat', icon: '🥩', color: '#e67e22' },
  { id: '5', name: 'Bakery', icon: '🍞', color: '#f39c12' },
  { id: '6', name: 'Grains', icon: '🌾', color: '#8e44ad' },
  { id: '7', name: 'Beverages', icon: '🥤', color: '#1abc9c' },
  { id: '8', name: 'Snacks', icon: '🍿', color: '#9b59b6' },
  { id: '9', name: 'Frozen Foods', icon: '🧊', color: '#34495e' },
  { id: '10', name: 'Pantry', icon: '🏺', color: '#95a5a6' },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState(sampleProducts);
  const [refreshing, setRefreshing] = useState(false);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await productService.getAllProducts();
      if (fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleCategoryPress = async (category: string) => {
    setSelectedCategory(category);
    const categoryProducts = await productService.getProductsByCategory(category);
    if (categoryProducts.length > 0) {
      setProducts(categoryProducts);
    } else {
      // If no products found for category, show all products
      await loadProducts();
    }
  };

  const handleProductPress = (product: any) => {
    router.push({
      pathname: '/product',
      params: { productId: product.id }
    });
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showNotification(`${product.name} added to cart`, 'success');
  };

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.name && styles.selectedCategoryCard,
        { borderColor: item.color }
      ]}
      onPress={() => handleCategoryPress(item.name)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryName,
        selectedCategory === item.name && styles.selectedCategoryName
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Browse products by category</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        style={styles.categoriesContainer}
      />

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.productsList}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#27ae60',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
  },
  selectedCategoryCard: {
    backgroundColor: 'white',
    borderColor: '#27ae60',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#27ae60',
  },
  productsList: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  productCard: Platform.OS === 'ios' ? {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    overflow: 'hidden',
  } : Platform.OS === 'android' ? {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    elevation: 5, // Android shadow
    overflow: 'hidden',
  } : {
    // Web platform - no shadow styles
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#27ae60',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
