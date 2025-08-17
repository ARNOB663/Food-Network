import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useCart } from '../components/CartContext';
import { useNotification } from '../components/NotificationContext';
import { productService, sampleProducts } from '../services/productService';

export default function ProductScreen() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      if (productId) {
        const fetchedProduct = await productService.getProductById(productId as string);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          // Fallback to sample products if not found in Firebase
          const sampleProduct = sampleProducts.find(p => p.id === productId);
          if (sampleProduct) {
            setProduct(sampleProduct);
          }
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showNotification(`${quantity} ${product.name} added to cart`, 'success');
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  const isInStock = product.stock > 0;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
        
        <View style={styles.content}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]}
                onPress={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.quantityButton, quantity >= product.stock && styles.disabledButton]}
                onPress={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.stockSection}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <Text style={[
              styles.stockStatus,
              isInStock ? styles.inStock : styles.outOfStock
            ]}>
              {isInStock ? `${product.stock} in stock` : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !isInStock && styles.disabledButton
          ]}
          onPress={handleAddToCart}
          disabled={!isInStock}
        >
          <Text style={styles.addToCartButtonText}>
            {isInStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 24,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    minWidth: 30,
    textAlign: 'center',
  },
  stockSection: {
    marginBottom: 24,
  },
  stockStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  inStock: {
    color: '#27ae60',
  },
  outOfStock: {
    color: '#e74c3c',
  },
  footer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  addToCartButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
});
