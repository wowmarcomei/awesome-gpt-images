'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Github, Mail, User2 } from 'lucide-react'

export function WelcomeCard() {
  const { t } = useI18n()
  const { user } = useAuth()

  // 根据 provider 获取图标
  const getProviderIcon = (provider: string | null) => {
    switch (provider) {
      case 'github':
        return <Github className="w-4 h-4" />
      case 'email':
        return <Mail className="w-4 h-4" />
      default:
        return <User2 className="w-4 h-4" />
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {t('dashboard.welcome')}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{user?.email}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              {getProviderIcon(user?.app_metadata?.provider)}
              <span className="capitalize">{user?.app_metadata?.provider || 'email'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 