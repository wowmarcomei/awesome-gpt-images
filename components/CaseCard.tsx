'use client';

import { useState } from 'react';
import { Case } from '../types';
import { motion } from 'framer-motion';
import { FaXTwitter, FaCode, FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import Image from 'next/image';
import Toast from './Toast';
import { useI18n } from '../lib/i18n/context';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface CaseCardProps {
  case: Case;
  onTagClick?: (tag: string) => void;
}

export default function CaseCard({ case: caseData, onTagClick }: CaseCardProps) {
  const { t, currentLang } = useI18n();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // 确保 tags 存在且有当前语言的数据
  const currentTags = caseData.tags?.[currentLang] || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-[12/12]">
        <Image
          src={caseData.image}
          alt={caseData.title[currentLang]}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {caseData.title[currentLang]}
        </h3>
        
        <div className="flex items-center justify-between">
          <a
            href={caseData.author.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaXTwitter className="w-4 h-4" />
            <span>{caseData.author.name}</span>
          </a>
          <a
            href={caseData.originalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
            <span>{t('common.original')}</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {currentTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setShowPrompt(true);
            navigator.clipboard.writeText(caseData.prompt[currentLang]);
            setShowCopied(true);
          }}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('common.getPrompt')}
        </button>
      </div>

      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPrompt(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {caseData.title[currentLang]}
              </h3>
              {showCopied && (
                <span className="text-sm text-green-500">✓ {t('common.copied')}</span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {caseData.prompt[currentLang]}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 