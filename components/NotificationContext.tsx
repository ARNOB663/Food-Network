import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from './Notification';

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    duration: number;
  }>({
    visible: false,
    message: '',
    type: 'success',
    duration: 3000,
  });

  const showNotification = useCallback((
    message: string, 
    type: 'success' | 'error' | 'info' = 'success', 
    duration: number = 3000
  ) => {
    setNotification({
      visible: true,
      message,
      type,
      duration,
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      visible: false,
    }));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <Notification
        visible={notification.visible}
        message={notification.message}
        type={notification.type}
        onHide={hideNotification}
        duration={notification.duration}
      />
    </NotificationContext.Provider>
  );
};

