import React, { useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { useCart } from './CartContext';

interface CartNotificationWrapperProps {
  children: React.ReactNode;
}

export const CartNotificationWrapper: React.FC<CartNotificationWrapperProps> = ({ children }) => {
  const { showNotification } = useNotification();
  const { items } = useCart();

  // This component can be used to show notifications for cart actions
  // without causing the NotificationProvider error in CartContext

  return <>{children}</>;
};

