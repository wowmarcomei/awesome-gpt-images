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
        "transition-all",
        "md:p-2.5 md:rounded-full",
        "md:bg-gray-900 md:text-white md:dark:bg-white md:dark:text-gray-900",
        "md:hover:bg-gray-800 md:dark:hover:bg-gray-100",
        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl md:w-auto",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "text-gray-900 dark:text-white"
      )}
      aria-label={language === 'zh' ? '切换为英文' : 'Switch to Chinese'}
    >
      <MdLanguage className="w-5 h-5" />
      <span className="md:hidden text-sm font-medium">
        {language === 'zh' ? '切换为英文' : 'Switch to Chinese'}
      </span>
    </button>
  );
} 