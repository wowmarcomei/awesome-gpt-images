'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n/context';
import { LogIn } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'LIKE' | 'FAVORITE' | 'TRY' | null;
}

export function AuthDialog({ isOpen, onClose, actionType }: AuthDialogProps) {
  const router = useRouter();
  const { t } = useI18n();

  const handleLogin = () => {
    router.push('/auth');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <LogIn className="h-5 w-5" />
            {t('auth.dialog.title')}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {actionType === 'LIKE' 
              ? t('auth.dialog.like_description')
              : actionType === 'FAVORITE'
                ? t('auth.dialog.favorite_description')
                : t('auth.dialog.try_description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t('auth.dialog.cancel')}
          </Button>
          <Button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
          >
            {t('auth.dialog.login')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 