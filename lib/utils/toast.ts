import { toast } from 'sonner'

export function showLoginToast() {
  toast.error('请先登录', {
    description: '您需要登录后才能执行此操作',
    action: {
      label: '去登录',
      onClick: () => window.location.href = '/auth'
    }
  })
} 