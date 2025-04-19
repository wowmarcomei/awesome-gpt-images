'use client'

import { ReactNode } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { useRouter, usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, Star, Heart, Bookmark } from 'lucide-react'
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
  const activeTab = pathname.includes('/bookmark') 
    ? 'bookmark' 
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
          if (value === 'bookmark') {
            router.push('/dashboard/bookmark')
          } else if (value === 'likes') {
            router.push('/dashboard/likes')
          }
        }}>
          <div className="my-6">
            <TabsList className="w-full max-w-sm bg-background/5 backdrop-blur-sm rounded-full p-1.5 border border-border/30 shadow-sm">
              <TabsTrigger 
                value="bookmark" 
                className="flex-1 flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-all
                data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/50 data-[state=inactive]:hover:text-foreground
                data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20"
              >
                <Bookmark className="h-4 w-4" />
                <span>{t('dashboard.bookmark')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="flex-1 flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-all ml-2
                data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/50 data-[state=inactive]:hover:text-foreground
                data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20"
              >
                <Heart className="h-4 w-4" />
                <span>{t('dashboard.likes')}</span>
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
