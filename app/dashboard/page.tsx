'use client'

import { WelcomeCard } from './components/WelcomeCard'
import { StatsCard } from './components/StatsCard'
import { RecentActivity } from './components/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeCard />
      <StatsCard />
      <RecentActivity />
    </div>
  )
} 