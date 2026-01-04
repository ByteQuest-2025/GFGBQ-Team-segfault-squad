import { useState, useCallback } from 'react';
import { Notification, NotificationType } from '../components/notifications/NotificationCenter';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message: string,
      duration?: number
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration,
      };

      setNotifications((prev) => [...prev, notification]);
      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message: string, duration?: number) =>
      addNotification('success', title, message, duration),
    [addNotification]
  );

  const error = useCallback(
    (title: string, message: string, duration?: number) =>
      addNotification('error', title, message, duration),
    [addNotification]
  );

  const warning = useCallback(
    (title: string, message: string, duration?: number) =>
      addNotification('warning', title, message, duration),
    [addNotification]
  );

  const info = useCallback(
    (title: string, message: string, duration?: number) =>
      addNotification('info', title, message, duration),
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
  };
}
