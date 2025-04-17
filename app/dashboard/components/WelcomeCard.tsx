'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Github, Mail, User2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function WelcomeCard() {
  const { t } = useI18n()
  const { user } = useAuth()

  // 根据 provider 获取图标
  const getProviderIcon = (provider: string | null) => {
    switch (provider) {
      case 'github':
        return <Github className="w-5 h-5" />
      case 'email':
        return <Mail className="w-5 h-5" />
      default:
        return <User2 className="w-5 h-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-background">
        <CardContent className="p-8 relative">
          {/* 装饰性元素 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {t('dashboard.welcome')}
                </h2>
                <p className="text-muted-foreground">
                  {t('dashboard.welcome_back')}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                  {getProviderIcon(user?.app_metadata?.provider)}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium truncate">
                    {user?.email}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user?.app_metadata?.provider || 'email'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 