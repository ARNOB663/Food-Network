import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  resetCart: () => void; // New method to reset cart completely
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever items change
  useEffect(() => {
    saveCart();
  }, [items]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Item already exists, update quantity
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          return prevItems;
        }
        
        const updatedItems = prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
        
        return updatedItems;
      } else {
        // New item
        if (quantity > product.stock) {
          return prevItems;
        }
        
        const newItems = [...prevItems, { product, quantity }];
        return newItems;
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.product.id !== productId);
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.product.id === productId);
      if (!item) return prevItems;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const newItems = prevItems.filter(item => item.product.id !== productId);
        return newItems;
      }

      if (quantity > item.product.stock) {
        return prevItems;
      }

      const updatedItems = prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const resetCart = async () => {
    setItems([]);
    try {
      await AsyncStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart from storage:', error);
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      resetCart,
      getTotalItems,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};
