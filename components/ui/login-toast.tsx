'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from './button'
import { useI18n } from '@/lib/i18n/context'

interface LoginToastProps {
  action: 'like' | 'favorite'
}

export function showLoginToast(action: 'like' | 'favorite') {
  return new Promise<void>((resolve) => {
    toast.custom((t) => <LoginToast action={action} />, {
      duration: 4000,
      position: 'bottom-center'
    })
  })
}

function LoginToast({ action }: LoginToastProps) {
  const router = useRouter()
  const { t } = useI18n()

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-background p-4 shadow-lg">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">
          {t(`toast.login_required_${action}`)}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('toast.login_to_continue')}
        </p>
      </div>
      <Button
        size="sm"
        onClick={() => {
          router.push('/auth')
        }}
      >
        {t('common.login')}
      </Button>
    </div>
  )
} 