import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible && onClose) {
      // 1秒后自动关闭
      const timer = setTimeout(onClose, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      {/* 背景遮罩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
      />
      
      {/* 提示框 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="relative max-w-[90vw] pointer-events-auto"
      >
        <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
            <FaCheck className="w-4 h-4 text-green-500 dark:text-green-400" />
          </div>
          <span className="text-base font-medium whitespace-nowrap">{message}</span>
        </div>
      </motion.div>
    </div>
  );
} 