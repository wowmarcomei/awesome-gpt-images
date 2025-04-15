'use client';

import { useState } from 'react';
import { Case } from '../lib/types';
import { motion } from 'framer-motion';
import { FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';
import Toast from './Toast';
import { useI18n } from '../lib/i18n/context';

interface CaseCardProps {
  case: Case;
  onTagClick: (tag: string) => void;
}

export default function CaseCard({ case: caseData, onTagClick }: CaseCardProps) {
  const [showCopied, setShowCopied] = useState(false);
  const { t } = useI18n();

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(caseData.prompt);
      setShowCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
      >
        {/* 图片容器 */}
        <div className="relative aspect-[1088/992] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={caseData.image}
            alt={caseData.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* 内容区域 */}
        <div className="p-4 flex flex-col flex-grow">
          {/* 标题和作者信息 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {caseData.title}
            </h3>
            <div className="flex items-center justify-between">
              <a
                href={caseData.author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaXTwitter className="w-4 h-4" />
                {caseData.author.name}
              </a>
              <a
                href={caseData.originalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t('card.original')}
              </a>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {caseData.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Prompt */}
          <div className="flex-grow flex flex-col">
            <div className="relative flex-grow mb-3">
              <pre className="h-[120px] overflow-y-auto p-4 bg-amber-50 dark:bg-gray-900 rounded-lg text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono border border-amber-200 dark:border-gray-700">
                {caseData.prompt}
              </pre>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t('card.getPrompt')}
            </button>
          </div>
        </div>
      </motion.div>

      <Toast
        message={t('card.copied')}
        show={showCopied}
        onClose={() => setShowCopied(false)}
      />
    </>
  );
} 