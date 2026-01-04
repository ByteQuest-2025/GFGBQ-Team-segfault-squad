import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationProps extends Notification {
  onClose: (id: string) => void;
}

function NotificationItem({ id, type, title, message, onClose, duration = 5000 }: NotificationProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearInterval(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#00CC88]" />,
    warning: <AlertCircle className="w-5 h-5 text-[#FFC043]" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF4D4D]" />,
    info: <Info className="w-5 h-5 text-[#00F3FF]" />,
  };

  const bgColors = {
    success: 'bg-[#00CC88]/10 border-[#00CC88]/40',
    warning: 'bg-[#FFC043]/10 border-[#FFC043]/40',
    error: 'bg-[#FF4D4D]/10 border-[#FF4D4D]/40',
    info: 'bg-[#00F3FF]/10 border-[#00F3FF]/40',
  };

  return (
    <div className={`glass-card border ${bgColors[type]} animate-slide-up mb-3 flex items-start gap-3`}>
      {icons[type]}
      <div className="flex-1">
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-sm text-gray-300">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  return (
    <div className="fixed top-6 right-6 z-40 max-w-md space-y-3 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem {...notification} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
