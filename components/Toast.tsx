'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose?: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show && onClose) {
      // 1秒后自动关闭
      const timer = setTimeout(onClose, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-0 right-0 top-[50%] -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="w-[90vw] max-w-sm mx-auto pointer-events-auto">
              <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-2xl">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <FaCheck className="w-4 h-4 text-green-500 dark:text-green-400" />
                </div>
                <span className="text-base font-medium">{message}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 