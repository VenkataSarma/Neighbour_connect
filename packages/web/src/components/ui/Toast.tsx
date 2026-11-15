import { useEffect } from 'react';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const TOAST_STYLES = {
  success: 'bg-emerald-500 text-white border-emerald-600',
  error: 'bg-red-500 text-white border-red-600',
  info: 'bg-blue-500 text-white border-blue-600',
  warning: 'bg-amber-500 text-white border-amber-600',
};

export const Toast = ({ message, type = 'info', duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${TOAST_STYLES[type]} animate-in slide-in-from-right-full duration-300`}>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-md transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};
