'use client'

import { StatsCard } from './components/StatsCard'
import { RecentActivity } from './components/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 统计卡片区域 - 占满整行 */}
      <div className="w-full">
        <StatsCard />
      </div>
      
      {/* 活动时间线 */}
      <RecentActivity />
    </div>
  )
} 