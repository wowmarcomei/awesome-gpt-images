'use client'

import { WelcomeCard } from './components/WelcomeCard'
import { StatsCard } from './components/StatsCard'
import { RecentActivity } from './components/RecentActivity'
import { UserProfileCard } from './components/UserProfileCard'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 欢迎卡片 */}
      <WelcomeCard />
      
      {/* 统计卡片和用户信息区域 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 统计卡片占据前两列 */}
        <div className="md:col-span-2">
          <StatsCard />
        </div>
        
        {/* 用户信息卡片占据第三列 */}
        <div>
          <UserProfileCard />
        </div>
      </div>
      
      {/* 活动时间线 */}
      <RecentActivity />
    </div>
  )
} 