'use client';

import { useI18n } from '../lib/i18n/context';
import { cn } from '../lib/utils';
import { MdLanguage } from 'react-icons/md';

export function LanguageSwitch() {
  const { language, setLanguage } = useI18n();

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className={cn(
        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "text-gray-900 dark:text-white"
      )}
    >
      <MdLanguage className="w-5 h-5" />
      <span className="text-sm font-medium">
        {language === 'zh' ? '切换为英文' : 'Switch to Chinese'}
      </span>
    </button>
  );
} 