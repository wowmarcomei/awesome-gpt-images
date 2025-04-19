'use client'

import { ReactNode } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { useRouter, usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CollectionLayoutProps {
  title: string
  description: string
  children: ReactNode
  showTabs?: boolean
}

export function CollectionLayout({
  title,
  description,
  children,
  showTabs = true
}: CollectionLayoutProps) {
  const { t } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  
  // 确定当前活动的标签
  const activeTab = pathname.includes('/favorites') 
    ? 'favorites' 
    : pathname.includes('/likes') 
      ? 'likes' 
      : 'dashboard'

  return (
    <div className="space-y-6">
      {/* 返回按钮和标题区域 */}
      <div className="flex flex-col space-y-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit flex items-center text-muted-foreground hover:text-foreground -ml-2 mb-1"
          onClick={() => router.push('/dashboard')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('common.back')}
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {description}
        </p>
      </div>

      {/* 标签切换 */}
      {showTabs && (
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => {
          if (value === 'favorites') {
            router.push('/dashboard/favorites')
          } else if (value === 'likes') {
            router.push('/dashboard/likes')
          }
        }}>
          <div className="p-1 bg-muted rounded-lg mb-4">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-transparent gap-1">
              <TabsTrigger 
                value="favorites" 
                className="flex items-center gap-2 bg-muted hover:bg-background data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Star className="h-4 w-4" />
                <span className="font-medium">{t('dashboard.favorites')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="flex items-center gap-2 bg-muted hover:bg-background data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Heart className="h-4 w-4" />
                <span className="font-medium">{t('dashboard.likes')}</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      )}

      {/* 主要内容 */}
      {children}
    </div>
  )
}
