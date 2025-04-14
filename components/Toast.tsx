import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          
          {/* 提示框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                <FaCheck className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              <span className="text-base font-medium">{message}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 