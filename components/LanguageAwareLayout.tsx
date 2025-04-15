'use client';

import { useEffect } from 'react';
import { useI18n } from '../lib/i18n/context';

export function LanguageAwareLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en-US';
  }, [locale]);

  return <>{children}</>;
} 