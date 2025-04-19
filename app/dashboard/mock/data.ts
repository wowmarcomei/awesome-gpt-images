// 模拟用户活动数据
export const mockActivities = [
  {
    id: '1',
    type: 'create',
    content: '创建了"生成了一个宇宙飞船"案例',
    timestamp: '2025-04-18T10:30:00Z',
    meta: {
      caseId: '101',
      imageUrl: '/images/cases/spaceship.jpg'
    }
  },
  {
    id: '2',
    type: 'favorite',
    content: '收藏了"DALL-E 生成的未来城市"案例',
    timestamp: '2025-04-17T15:45:00Z',
    meta: {
      caseId: '102',
      imageUrl: '/images/cases/future-city.jpg'
    }
  },
  {
    id: '3',
    type: 'like',
    content: '点赞了"水彩风格的山水画"案例',
    timestamp: '2025-04-16T09:20:00Z',
    meta: {
      caseId: '103',
      imageUrl: '/images/cases/watercolor.jpg'
    }
  },
  {
    id: '4',
    type: 'comment',
    content: '评论了"像素艺术风格的城堡"案例',
    timestamp: '2025-04-15T18:10:00Z',
    meta: {
      caseId: '104',
      imageUrl: '/images/cases/pixel-castle.jpg',
      comment: '这个像素风格太棒了！'
    }
  },
  {
    id: '5',
    type: 'system',
    content: '系统更新了您的账户信息',
    timestamp: '2025-04-14T11:05:00Z'
  },
  {
    id: '6',
    type: 'create',
    content: '创建了"AI生成的科幻场景"案例',
    timestamp: '2025-04-13T14:25:00Z',
    meta: {
      caseId: '105',
      imageUrl: '/images/cases/scifi.jpg'
    }
  }
];

// 模拟统计数据
export const mockStats = {
  favorites: 12,
  likes: 24
};

// 模拟用户数据
export const mockUserProfile = {
  name: '用户',
  email: 'wowmarcomei@gmail.com',
  avatar: '/images/avatar.jpg',
  github: 'GitHub',
  githubUrl: 'https://github.com',
  joinDate: '2025-01-15T00:00:00Z'
};
