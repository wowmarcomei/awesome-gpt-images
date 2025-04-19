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
  favorites: 6,
  likes: 6
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

// 模拟收藏内容数据
export const mockFavorites = [
  {
    id: '101',
    title: 'Q版求婚场景',
    description: '将照片里的两个人转换成Q版 3D人物，场景换成求婚，背景换成淡雅五彩花瓣做的拐门。',
    imageUrl: '/examples/example_proposal_scene_q_realistic.jpeg',
    createdAt: '2025-04-17T15:45:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['Q版', '3D', '求婚']
  },
  {
    id: '102',
    title: '立体相框',
    description: '将场景中的角色转化为3D Q版风格，放在一张拍立得照片上，相纸被一只手拿着。',
    imageUrl: '/examples/example_polaroid_breakout.png',
    createdAt: '2025-04-15T18:10:00Z',
    isLiked: false,
    isFavorited: true,
    tags: ['3D', 'Q版', '创意']
  },
  {
    id: '103',
    title: '复古宣传海报',
    description: '复古宣传海报风格，突出中文文字，背景为红黄放射状图案。画面中心位置有一位美丽的年轻女性。',
    imageUrl: '/examples/example_vintage_poster.jpeg',
    createdAt: '2025-04-13T14:25:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['复古', '海报', '广告']
  },
  {
    id: '104',
    title: 'Q 版中式婚礼图',
    description: '将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景"双喜字"剪纸风格图案。',
    imageUrl: '/examples/example_q_chinese_wedding.jpeg',
    createdAt: '2025-04-12T09:30:00Z',
    isLiked: false,
    isFavorited: true,
    tags: ['Q版', '中式婚礼', '3D']
  },
  {
    id: '105',
    title: '吉卜力风格',
    description: '以吉卜力风格重绘这张照片，展示了独特的动漫特色。',
    imageUrl: '/examples/example_ghibli-style-mona-lisa.png',
    createdAt: '2025-04-11T16:20:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['吉卜力', '风格转换', '动漫']
  },
  {
    id: '106',
    title: '角色穿越传送门',
    description: '照片中的角色的 3D Q 版形象穿过传送门，牌着观众的手，在将观众拉向前时动态地回头一看。',
    imageUrl: '/examples/example_portal_crossing_handhold.jpeg',
    createdAt: '2025-04-10T11:15:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['3D', 'Q版', '传送门']
  }
];

// 模拟点赞内容数据
export const mockLikes = [
  {
    id: '201',
    title: '个性化房间设计',
    description: '为我生成我的房间设计（床、书架、沙发、电脑桶和电脑、墙上挂着绘画、绿植，窗外是城市夜景。',
    imageUrl: '/examples/example_personalized_room.png',
    createdAt: '2025-04-16T09:20:00Z',
    isLiked: true,
    isFavorited: false,
    tags: ['房间设计', '3D', '可爱']
  },
  {
    id: '202',
    title: '乐高收藏品',
    description: '根据我上传的照片，生成一张纵向比例的照片，经典乐高人偏风格，一个微缩场景。',
    imageUrl: '/examples/example_lego_collectible.jpeg',
    createdAt: '2025-04-18T10:30:00Z',
    isLiked: true,
    isFavorited: false,
    tags: ['乐高', '微缩', '收藏品']
  },
  {
    id: '203',
    title: '气球名画',
    description: '将图片中的人物变成玩偌形状的氧气球，展示了独特的创意设计。',
    imageUrl: '/examples/example_pearl_earring_balloon.jpeg',
    createdAt: '2025-04-13T14:25:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['气球', '名画', '创意']
  },
  {
    id: '204',
    title: 'Q版求婚场景',
    description: '将照片里的两个人转换成Q版 3D人物，场景换成求婚，背景换成淡雅五彩花瓣做的拐门。',
    imageUrl: '/examples/example_proposal_scene_q_realistic.jpeg',
    createdAt: '2025-04-09T22:40:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['Q版', '3D', '求婚']
  },
  {
    id: '205',
    title: '复古宣传海报',
    description: '复古宣传海报风格，突出中文文字，背景为红黄放射状图案。画面中心位置有一位美丽的年轻女性。',
    imageUrl: '/examples/example_vintage_poster.jpeg',
    createdAt: '2025-04-17T15:45:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['复古', '海报', '广告']
  },
  {
    id: '206',
    title: '角色穿越传送门',
    description: '照片中的角色的 3D Q 版形象穿过传送门，牌着观众的手，在将观众拉向前时动态地回头一看。',
    imageUrl: '/examples/example_portal_crossing_handhold.jpeg',
    createdAt: '2025-04-11T16:20:00Z',
    isLiked: true,
    isFavorited: true,
    tags: ['3D', 'Q版', '传送门']
  }
];
