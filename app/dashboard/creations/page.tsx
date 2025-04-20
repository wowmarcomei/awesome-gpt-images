'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { FaTools } from 'react-icons/fa';
import { MdConstruction } from 'react-icons/md';

export default function CreationsPage() {
  const { t } = useI18n();

  // 页面标题
  useEffect(() => {
    document.title = `${t('dashboard.creations')} - ${t('site.title')}`;
  }, [t]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <MdConstruction className="text-6xl text-blue-500 dark:text-blue-400" />
            <FaTools className="text-3xl text-yellow-500 dark:text-yellow-400 absolute -bottom-2 -right-2" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('dashboard.coming_soon')}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('dashboard.creations_description')}
        </p>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden mb-4">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: '1%' }}></div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('dashboard.development_progress').replace('{progress}', '1%')}
        </p>
      </motion.div>
    </div>
  );
}
