'use client';

import { Fragment } from 'react';
import { useI18n } from '../lib/i18n/context';
import { cn } from '../lib/utils';
import { MdLanguage, MdCheck } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function LanguageMenu() {
  const { locale, setLanguage, t } = useI18n();

  const languages = [
    { code: 'zh', name: '中文', flag: <FaFlag className="h-4 w-4" /> },
    { code: 'en', name: 'English', flag: <GrLanguage className="h-4 w-4" /> }
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "transition-all",
            "p-2.5 rounded-full",
            "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
            "hover:bg-gray-800 dark:hover:bg-gray-100",
            "focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
          )}
          aria-label={t('dashboard.switchLanguage')}
        >
          <MdLanguage className="w-5 h-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg"
          sideOffset={5}
          align="end"
          alignOffset={-5}
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {t('dashboard.switchLanguage')}
          </DropdownMenu.Label>
          
          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
          
          {languages.map((language) => (
            <DropdownMenu.Item
              key={language.code}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer",
                "focus:outline-none",
                locale === language.code 
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
              onClick={() => setLanguage(language.code as 'zh' | 'en')}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {language.flag}
              </div>
              <span>{language.name}</span>
              {locale === language.code && (
                <MdCheck className="ml-auto h-4 w-4" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
