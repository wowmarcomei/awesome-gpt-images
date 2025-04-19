'use client';

import { useState, useEffect } from 'react';
import { Case } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXTwitter, FaCode, FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import Image from 'next/image';
import Toast from './Toast';
import { useI18n } from '../lib/i18n/context';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useCollections } from '@/hooks/use-collections';
import { showLoginToast } from './ui/login-toast';
import { HeartIcon, BookmarkIcon, EyeIcon, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ActionToast } from '@/components/ui/action-toast';
import { useAuth } from '@/hooks/use-auth';
import { AuthDialog } from '@/components/ui/auth-dialog';

interface CaseCardProps {
  case: Case;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export default function CaseCard({ case: caseData, onTagClick, className }: CaseCardProps) {
  const { t, currentLang } = useI18n();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const { loading, toggleCollection, isLiked, isFavorited } = useCollections();
  const router = useRouter();
  const { user } = useAuth();
  const [showLikeToast, setShowLikeToast] = useState(false);
  const [showFavoriteToast, setShowFavoriteToast] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authAction, setAuthAction] = useState<'LIKE' | 'FAVORITE' | 'TRY' | null>(null);
  const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);

  // 确保 tags 存在且有当前语言的数据
  const currentTags = caseData.tags?.[currentLang] || [];

  const handleLike = async () => {
    if (loading) return;
    if (!user) {
      setAuthAction('LIKE');
      setShowAuthDialog(true);
      return;
    }
    setShowLikeToast(true);
    await toggleCollection(caseData.id, 'LIKE');
    setTimeout(() => setShowLikeToast(false), 2000);
  };

  const handleFavorite = async () => {
    if (loading) return;
    if (!user) {
      setAuthAction('FAVORITE');
      setShowAuthDialog(true);
      return;
    }
    setShowFavoriteToast(true);
    await toggleCollection(caseData.id, 'FAVORITE');
    setTimeout(() => setShowFavoriteToast(false), 2000);
  };

  const handleTryIt = () => {
    if (!user) {
      // 用户未登录，显示登录提示
      setAuthAction('TRY');
      setShowAuthDialog(true);
      return;
    }
    // 用户已登录，显示开发中提示
    setShowDevelopmentModal(true);
  };

  const handleShowPrompt = async () => {
    setShowPrompt(true);
    try {
      await navigator.clipboard.writeText(caseData.prompt[currentLang]);
      setShowCopied(true);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <div className={cn("group relative", className)}>
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800">
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

          <div className="flex flex-wrap gap-2 mt-3 mb-4">
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

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full transition-all duration-300",
                  "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                  "relative overflow-visible",
                  isLiked(caseData.id) && "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400"
                )}
                onClick={handleLike}
              >
              <motion.div
                whileTap={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative flex items-center justify-center"
              >
                <HeartIcon
                  className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    isLiked(caseData.id) ? "fill-red-500 text-red-500" : "text-red-500/70 dark:text-red-400/70"
                  )}
                />
                <AnimatePresence>
                  {showLikeToast && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.9 }}
                      animate={{ opacity: 1, y: -40, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2",
                        "z-50 min-w-max",
                        "px-3 py-1.5 rounded-full text-sm",
                        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
                        "shadow-lg shadow-black/5 dark:shadow-black/20",
                        "border border-gray-200 dark:border-gray-700",
                        "flex items-center gap-1.5"
                      )}
                    >
                      <span className="text-base">{isLiked(caseData.id) ? '❤️' : '🤍'}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {isLiked(caseData.id) ? '已点赞' : '已取消点赞'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full transition-all duration-300",
                "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                "relative overflow-visible",
                isFavorited(caseData.id) && "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400"
              )}
              onClick={handleFavorite}
            >
              <motion.div
                whileTap={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative flex items-center justify-center"
              >
                <BookmarkIcon
                  className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    isFavorited(caseData.id) ? "fill-blue-500 text-blue-500" : "text-blue-500/70 dark:text-blue-400/70"
                  )}
                />
                <AnimatePresence>
                  {showFavoriteToast && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.9 }}
                      animate={{ opacity: 1, y: -40, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2",
                        "z-50 min-w-max",
                        "px-3 py-1.5 rounded-full text-sm",
                        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
                        "shadow-lg shadow-black/5 dark:shadow-black/20",
                        "border border-gray-200 dark:border-gray-700",
                        "flex items-center gap-1.5"
                      )}
                    >
                      <span className="text-base">{isFavorited(caseData.id) ? '⭐️' : '☆'}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {isFavorited(caseData.id) ? '已收藏' : '已取消收藏'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Button>

            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/30 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
              onClick={handleShowPrompt}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              {t('common.getPrompt')}
            </Button>
            </div>
            
            {/* 我也试试按钮 */}
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-2 text-sm"
              onClick={handleTryIt}
            >
              <Sparkles className="h-4 w-4" />
              {t('common.try_it')}
            </Button>
          </div>
        </div>
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
              <div className="flex items-center gap-4">
                {showCopied && (
                  <span className="text-sm text-green-500 dark:text-green-400">✓ {t('common.copied')}</span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowPrompt}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaCode className="mr-2 h-4 w-4" />
                  {t('common.copy')}
                </Button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {caseData.prompt[currentLang]}
            </p>
          </motion.div>
        </motion.div>
      )}

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => {
          setShowAuthDialog(false);
          setAuthAction(null);
        }}
        actionType={authAction}
      />
      
      {/* 开发中提示模态框 */}
      <AnimatePresence>
        {showDevelopmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDevelopmentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('common.under_development')}
                </h3>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDevelopmentModal(false)}
                  className="mt-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {t('common.back')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 