'use client';

import { useI18n } from '../lib/i18n/context';
import { cn } from '../lib/utils';

export function LanguageSwitch() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
      <button
        onClick={() => setLanguage('zh')}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
          language === 'zh'
            ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        )}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
          language === 'en'
            ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        )}
      >
        English
      </button>
    </div>
  );
} 