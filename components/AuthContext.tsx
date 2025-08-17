import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError,
  AuthErrorCodes
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get user-friendly error message
const getErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case AuthErrorCodes.USER_DELETED:
      return 'No account found with this email address.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Incorrect password. Please try again.';
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'An account with this email already exists.';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'Password should be at least 6 characters long.';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Please enter a valid email address.';
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return 'Too many failed attempts. Please try again later.';
    case AuthErrorCodes.NETWORK_REQUEST_FAILED:
      return 'Network error. Please check your internet connection.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userData.name || '',
            });
          } else {
            // If user exists in auth but not in Firestore, create the document
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              createdAt: new Date(),
            });
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          // Still set user even if Firestore fails
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate email
      if (!isValidEmail(email)) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      // Validate password
      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const authError = error as AuthError;
      return { success: false, error: getErrorMessage(authError) };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate name
      if (!name || name.trim().length < 2) {
        return { success: false, error: 'Name must be at least 2 characters long.' };
      }

      // Validate email
      if (!isValidEmail(email)) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      // Validate password
      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date(),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      const authError = error as AuthError;
      return { success: false, error: getErrorMessage(authError) };
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user) {
        return false;
      }

      // Update user data in Firestore
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, updates);

      // Update local user state
      setUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Clear cart data from AsyncStorage first
      try {
        await AsyncStorage.removeItem('cart');
      } catch (storageError) {
        console.error('Error clearing cart storage:', storageError);
      }
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear local user state
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if Firebase logout fails, clear local state
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
