export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const categories: Category[] = [
  {
    id: 'style',
    name: '风格',
    subcategories: [
      { id: 'q-version', name: 'Q版' },
      { id: '3d', name: '3D' },
      { id: 'realistic', name: '写实' },
      { id: 'vintage', name: '复古' },
      { id: 'minimalist', name: '极简' },
      { id: 'cartoon', name: '卡通' },
      { id: 'anime', name: '动漫' },
      { id: 'chinese', name: '中式' }
    ]
  },
  {
    id: 'scene',
    name: '场景',
    subcategories: [
      { id: 'wedding', name: '婚礼' },
      { id: 'proposal', name: '求婚' },
      { id: 'interior', name: '室内设计' },
      { id: 'portrait', name: '人像' },
      { id: 'landscape', name: '风景' },
      { id: 'food', name: '美食' }
    ]
  },
  {
    id: 'type',
    name: '类型',
    subcategories: [
      { id: 'poster', name: '海报' },
      { id: 'illustration', name: '插画' },
      { id: 'sticker', name: '贴纸' },
      { id: 'logo', name: '标志' },
      { id: 'packaging', name: '包装' },
      { id: 'infographic', name: '信息图' },
      { id: 'comic', name: '漫画' }
    ]
  },
  {
    id: 'theme',
    name: '主题',
    subcategories: [
      { id: 'game', name: '游戏' },
      { id: 'movie', name: '电影' },
      { id: 'creative', name: '创意' },
      { id: 'social-media', name: '社交媒体' },
      { id: 'education', name: '教育' },
      { id: 'business', name: '商业' }
    ]
  }
]; 