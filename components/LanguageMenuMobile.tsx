'use client';

import { useI18n } from '../lib/i18n/context';
import { cn } from '../lib/utils';
import { MdLanguage } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';

type LanguageMenuMobileProps = {
  onItemClick?: () => void;
};

export function LanguageMenuMobile({ onItemClick }: LanguageMenuMobileProps) {
  const { locale, setLanguage, t } = useI18n();

  const handleLanguageChange = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    setLanguage(newLocale);
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <button
      onClick={handleLanguageChange}
      className={cn(
        "w-full flex items-center px-4 py-2.5 rounded-xl transition-all",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "text-gray-900 dark:text-white"
      )}
      aria-label={t('dashboard.switchLanguage')}
    >
      <div className="w-7 flex items-center">
        <MdLanguage className="w-5 h-5" />
      </div>
      <span className="text-sm font-medium">
        {locale === 'zh' 
          ? t('dashboard.toEnglish') 
          : t('dashboard.toChinese')
        }
      </span>
    </button>
  );
}
