export interface Category {
  id: string;
  name: {
    zh: string;
    en: string;
  };
  subcategories: {
    id: string;
    name: {
      zh: string;
      en: string;
    };
  }[];
}

export const categories: Category[] = [
  {
    id: 'style',
    name: {
      zh: '风格',
      en: 'Style'
    },
    subcategories: [
      {
        id: '3d',
        name: {
          zh: '3D',
          en: '3D'
        }
      },
      {
        id: 'q-version',
        name: {
          zh: 'Q版',
          en: 'Chibi'
        }
      },
      {
        id: 'anime',
        name: {
          zh: '动漫',
          en: 'Anime'
        }
      },
      {
        id: 'cartoon',
        name: {
          zh: '卡通',
          en: 'Cartoon'
        }
      },
      {
        id: 'minimalist',
        name: {
          zh: '极简主义',
          en: 'Minimalist'
        }
      },
      {
        id: 'retro',
        name: {
          zh: '复古',
          en: 'Retro'
        }
      },
      {
        id: 'hand-drawn',
        name: {
          zh: '手绘',
          en: 'Hand-drawn'
        }
      },
      {
        id: 'surreal',
        name: {
          zh: '超现实',
          en: 'Surreal'
        }
      },
      {
        id: 'creative',
        name: {
          zh: '创意',
          en: 'Creative'
        }
      }
    ]
  },
  {
    id: 'theme',
    name: {
      zh: '主题',
      en: 'Theme'
    },
    subcategories: [
      {
        id: 'wedding',
        name: {
          zh: '婚礼',
          en: 'Wedding'
        }
      },
      {
        id: 'proposal',
        name: {
          zh: '求婚',
          en: 'Proposal'
        }
      },
      {
        id: 'chinese-wedding',
        name: {
          zh: '中式婚礼',
          en: 'Chinese Wedding'
        }
      },
      {
        id: 'family',
        name: {
          zh: '家庭',
          en: 'Family'
        }
      },
      {
        id: 'fantasy',
        name: {
          zh: '奇幻',
          en: 'Fantasy'
        }
      },
      {
        id: 'advertisement',
        name: {
          zh: '广告',
          en: 'Advertisement'
        }
      },
      {
        id: 'education',
        name: {
          zh: '教育',
          en: 'Education'
        }
      },
      {
        id: 'food',
        name: {
          zh: '食物',
          en: 'Food'
        }
      },
      {
        id: 'couple',
        name: {
          zh: '情侣',
          en: 'Couple'
        }
      },
      {
        id: 'science',
        name: {
          zh: '科学',
          en: 'Science'
        }
      },
      {
        id: 'masterpiece',
        name: {
          zh: '名画',
          en: 'Masterpiece'
        }
      }
    ]
  },
  {
    id: 'format',
    name: {
      zh: '格式',
      en: 'Format'
    },
    subcategories: [
      {
        id: 'sticker',
        name: {
          zh: '贴纸',
          en: 'Sticker'
        }
      },
      {
        id: 'poster',
        name: {
          zh: '海报',
          en: 'Poster'
        }
      },
      {
        id: 'cover',
        name: {
          zh: '封面',
          en: 'Cover'
        }
      },
      {
        id: 'infographic',
        name: {
          zh: '信息图',
          en: 'Infographic'
        }
      },
      {
        id: 'manga',
        name: {
          zh: '漫画',
          en: 'Manga'
        }
      },
      {
        id: 'illustration',
        name: {
          zh: '插画',
          en: 'Illustration'
        }
      },
      {
        id: 'diorama',
        name: {
          zh: '立体场景',
          en: 'Diorama'
        }
      },
      {
        id: 'figure',
        name: {
          zh: '公仔',
          en: 'Figure'
        }
      }
    ]
  },
  {
    id: 'others',
    name: {
      zh: '杂项',
      en: 'Others'
    },
    subcategories: [
      {
        id: 'creative',
        name: {
          zh: '其他',
          en: 'Creative'
        }
      }
    ]
  }
]; 