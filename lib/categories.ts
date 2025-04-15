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
      }
    ]
  }
]; 