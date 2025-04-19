'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Mail, Github, Edit2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { mockUserProfile } from '../mock/data'

export function UserProfileCard() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [profile, setProfile] = useState(mockUserProfile)
  const [loading, setLoading] = useState(false)

  // 在实际应用中，这里会从API获取用户完整资料
  useEffect(() => {
    if (user) {
      setProfile({
        ...mockUserProfile,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '用户',
        email: user.email || mockUserProfile.email,
      })
    }
  }, [user])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* 用户头像 */}
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={user?.user_metadata?.avatar_url || profile.avatar} alt={profile.name} />
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>

            {/* 用户名称 */}
            <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
            
            {/* 用户邮箱 */}
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              <span>{profile.email}</span>
            </div>
            
            {/* GitHub链接 */}
            {profile.githubUrl && (
              <Link 
                href={profile.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <Github className="w-3.5 h-3.5 mr-1.5" />
                <span>{profile.github}</span>
              </Link>
            )}
            
            {/* 编辑资料按钮 */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {/* 编辑资料逻辑 */}}
            >
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              {t('dashboard.edit_profile')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
