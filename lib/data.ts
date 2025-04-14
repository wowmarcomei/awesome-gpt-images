import { Case } from '../types';

export const cases: Case[] = [
  {
    id: 1,
    title: "Q版求婚场景",
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy"
    },
    originalLink: "https://x.com/balconychy/status/1909417750587486469",
    imageUrl: "/examples/example_proposal_scene_q_realistic.jpeg",
    prompt: "将照片里的两个人转换成Q版 3D人物，场景换成求婚，背景换成淡雅五彩花瓣做的拱门，背景换成浪漫颜色，地上散落着玫瑰花瓣。除了人物采用Q版 3D人物风格，其他环境采用真实写实风格。",
    requiresReferenceImage: true,
    tags: ["Q版", "3D", "求婚", "写实"]
  },
  {
    id: 2,
    title: "立体相框",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1908238003169903060",
    imageUrl: "/examples/example_polaroid_breakout.png",
    prompt: "将场景中的角色转化为3D Q版风格，放在一张拍立得照片上，相纸被一只手拿着，照片中的角色正从拍立得照片中走出，呈现出突破二维相片边框、进入二维现实空间的视觉效果。",
    requiresReferenceImage: true,
    tags: ["3D", "Q版", "创意"]
  },
  {
    id: 3,
    title: "复古宣传海报",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1905251524248248650",
    imageUrl: "/examples/example_vintage_poster.jpeg",
    prompt: "复古宣传海报风格，突出中文文字，背景为红黄放射状图案。画面中心位置有一位美丽的年轻女性，以精致复古风格绘制，面带微笑，气质优雅，具有亲和力。主题是GPT最新AI绘画服务的广告促销，强调\"惊爆价9.9/张\"、\"适用各种场景、图像融合、局部重绘\"、\"每张提交3次修改\"、\"AI直出效果，无需修改\"，底部醒目标注\"有意向点右下'我想要'\"，右下角绘制一个手指点击按钮动作，左下角展示OpenAI标志。",
    requiresReferenceImage: false,
    tags: ["复古", "海报", "广告"]
  },
  {
    id: 4,
    title: "Q版中式婚礼图",
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy"
    },
    originalLink: "https://x.com/balconychy/status/1909418699150237917",
    imageUrl: "/examples/example_q_chinese_wedding.jpeg",
    prompt: "将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景双喜字剪纸风格图案。服饰要求：写实，男士身着长袍马褂，主体为红色，上面以金色绣龙纹图案，彰显尊贵大气，胸前系着大红花，寓意喜庆吉祥。女士所穿是秀禾服，同样以红色为基调，饰有精美的金色花纹与凤凰刺绣，展现出典雅华丽之感，头上搭配花朵发饰，增添柔美温婉气质。",
    requiresReferenceImage: true,
    tags: ["Q版", "3D", "中式", "婚礼"]
  },
  {
    id: 5,
    title: "吉卜力风格",
    author: {
      name: "AnimeAI",
      twitter: "https://animeai.online"
    },
    originalLink: "https://animeai.online/#demo-gallery",
    imageUrl: "https://animeai.online/demo/ghibli-style-mona-lisa.png",
    prompt: "以吉卜力风格重绘这张照片",
    requiresReferenceImage: true,
    tags: ["吉卜力", "动画", "风格化"]
  },
  {
    id: 6,
    title: "角色穿越传送门",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1908910838636765204",
    imageUrl: "/examples/example_portal_crossing_handhold.jpeg",
    prompt: "照片中的角色的 3D Q 版形象穿过传送门，牵着观众的手，在将观众拉向前时动态地回头一看。传送门外的背景是观众的现实世界，一个典型的程序员的书房，有书桌，显示器和笔记本电脑，传送门内是角色所处的3D Q 版世界，细节可以参考照片，整体呈蓝色调，和现实世界形成鲜明对比。",
    requiresReferenceImage: true,
    tags: ["3D", "Q版", "创意", "传送门"]
  },
  {
    id: 7,
    title: "个性化房间设计",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1910698005193515370",
    imageUrl: "/examples/example_personalized_room.png",
    prompt: "为我生成我的房间设计（床、书架、沙发、电脑桌和电脑、墙上挂着绘画、绿植，窗外是城市夜景。可爱 3d 风格，c4d 渲染，轴测图。",
    requiresReferenceImage: false,
    tags: ["3D", "室内设计", "C4D", "轴测图"]
  },
  {
    id: 8,
    title: "乐高收藏品",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1910644499354968091",
    imageUrl: "/examples/example_lego_collectible.jpeg",
    prompt: "根据照片生成一张纵向比例的照片，经典乐高人偶风格，一个微缩场景，一只动物站在我身旁。这只动物的配色与我相匹配。整个场景设定在一个透明玻璃立方体内，布景极简。底座是哑光黑色，配以银色装饰。",
    requiresReferenceImage: true,
    tags: ["乐高", "收藏品", "微缩", "创意"]
  },
  {
    id: 9,
    title: "气球名画",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1910976632141267237",
    imageUrl: "/examples/example_pearl_earring_balloon.jpeg",
    prompt: "将图片中的人物变成玩偶形状的氦气球",
    requiresReferenceImage: true,
    tags: ["气球", "创意", "名画", "改编"]
  },
  {
    id: 10,
    title: "讽刺漫画生成",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1910514811756065159",
    imageUrl: "/examples/example_maga_hat_cartoon.jpeg",
    prompt: "一幅讽刺漫画风格的插画，采用复古美式漫画风格，背景是一个多层货架，货架上都是一样的红色棒球帽，帽子正面印有大字标语\"MAKE AMERICA GREAT AGAIN\"，帽侧贴着白色标签写着\"MADE IN CHINA\"，特写视角聚焦其中一顶红色棒球帽。",
    requiresReferenceImage: false,
    tags: ["漫画", "讽刺", "政治", "复古"]
  },
  {
    id: 11,
    title: "PS2游戏封面",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1904978767090524372",
    imageUrl: "/examples/example_ps2_gta_shrek.jpeg",
    prompt: "Create a PS2 video game case of \"Grand Theft Auto: Far Far Away\" a GTA based in the Shrek Universe.",
    requiresReferenceImage: false,
    tags: ["游戏", "封面", "混搭", "创意"]
  },
  {
    id: 12,
    title: "3D情侣珠宝盒摆件",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1909332895115714835",
    imageUrl: "/examples/example_3d_collectible_couple_box.jpeg",
    prompt: "根据照片上的内容打造一款细致精美、萌趣可爱的3D渲染收藏摆件，装置在柔和粉彩色调、温馨浪漫的展示盒中。展示盒为浅奶油色搭配柔和的金色装饰，形似精致的便携珠宝盒。打开盒盖，呈现出一幕温暖浪漫的场景：两位Q版角色正甜蜜相望。",
    requiresReferenceImage: true,
    tags: ["3D", "Q版", "情侣", "收藏品"]
  },
  {
    id: 13,
    title: "3D Q版风格",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1908194518345678865",
    imageUrl: "/examples/example_photo_to_3d_q.png",
    prompt: "将场景中的角色转化为3D Q版风格，同时保持原本的场景布置和服装造型不变。",
    requiresReferenceImage: true,
    tags: ["3D", "Q版", "人物"]
  },
  {
    id: 14,
    title: "海贼王主题手办制作",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1909047547563213145",
    imageUrl: "/examples/example_one_piece_figure_creation.png",
    prompt: "把照片中的人物变成《海贼王》（One Piece）动漫主题手办包装盒的风格，以等距视角（isometric）呈现。包装盒内展示的是基于照片人物的《海贼王》动漫画风设计的形象，旁边搭配有日常必备物品，同时在包装盒旁边还应呈现该手办本体的实物效果。",
    requiresReferenceImage: true,
    tags: ["动漫", "手办", "海贼王", "等距视角"]
  },
  {
    id: 15,
    title: "讽刺海报生成",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1905287637084274742",
    imageUrl: "/examples/example_gpt_involution_poster.png",
    prompt: "为我生成讽刺海报：GPT 4o 狂卷，都别干图像AI了 还是送外卖吧",
    requiresReferenceImage: false,
    tags: ["海报", "讽刺", "创意"]
  },
  {
    id: 16,
    title: "布丁老虎机",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1911107569898471818",
    imageUrl: "/examples/example_pudding_slot.jpeg",
    prompt: "将图标[🎰]变成美味可口布丁造型，Q弹质感，背景粉白渐变，整体甜美、轻盈、可爱",
    requiresReferenceImage: false,
    tags: ["美食", "创意", "可爱"]
  },
  {
    id: 17,
    title: "数码宝贝风格图",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1911001291280859559",
    imageUrl: "/examples/example_digimon_style.jpeg",
    prompt: "为我生成一张数码宝贝风格的图片，并为我匹配一只数码宝贝",
    requiresReferenceImage: true,
    tags: ["动漫", "数码宝贝", "角色"]
  },
  {
    id: 18,
    title: "皮克斯3D风格",
    author: {
      name: "AnimeAI",
      twitter: "https://animeai.online"
    },
    originalLink: "https://animeai.online/#demo-gallery",
    imageUrl: "https://animeai.online/demo/pixar-style-godfather-scene.png",
    prompt: "以皮克斯 3D 风格重绘这张照片",
    requiresReferenceImage: true,
    tags: ["3D", "皮克斯", "动画"]
  },
  {
    id: 19,
    title: "语文课本重绘",
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy"
    },
    originalLink: "https://x.com/balconychy/status/1906982626365178361",
    imageUrl: "/examples/example_textbook_redraw.jpeg",
    prompt: "重绘语文课本插画",
    requiresReferenceImage: true,
    tags: ["课本", "插画", "重绘"]
  },
  {
    id: 20,
    title: "四格漫画(相对论)",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1904980568107819060",
    imageUrl: "/examples/example_relativity_manga.jpeg",
    prompt: "make a colorful page of manga describing the theory of relativity. add some humor",
    requiresReferenceImage: false,
    tags: ["漫画", "科普", "相对论", "幽默"]
  },
  {
    id: 21,
    title: "简笔画表情包",
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO"
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1909907741948399873",
    imageUrl: "/examples/example_einstein_stickfigure_emoji.jpeg",
    prompt: "先把图片人物变成手绘简笔画风格，然后把简笔画按照吐舌头、微笑、皱眉、惊讶、思考、眨眼生成一系列表情包",
    requiresReferenceImage: true,
    tags: ["简笔画", "表情包", "系列"]
  },
  {
    id: 22,
    title: "小红书封面",
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy"
    },
    originalLink: "https://x.com/balconychy/status/1905507936526627078",
    imageUrl: "/examples/example_notebook_promo.png",
    prompt: "画一个小红书封面。要求：有足够的吸引力吸引用户点击；字体醒目，选择有个性的字体；文字大小按重要度分级，体现文案的逻辑结构；标题是普通文字的至少2倍；文字段落之间留白。",
    requiresReferenceImage: false,
    tags: ["设计", "封面", "小红书"]
  },
  {
    id: 23,
    title: "泰坦尼克号模仿",
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy"
    },
    originalLink: "https://x.com/balconychy/status/1909916265067557299",
    imageUrl: "/examples/example_titanic_q_realistic.jpeg",
    prompt: "将附图中的人物转换成可爱Q版3D造型，场景：在豪华游轮最顶尖的船头，船头是尖的。男士带着女士站在泰坦尼克号船头，男士双手搂着女士的腰，女士双臂伸展穿着连衣裙，迎着风，脸上洋溢着自由与畅快。",
    requiresReferenceImage: true,
    tags: ["Q版", "3D", "电影", "场景"]
  },
  {
    id: 24,
    title: "Funko Pop公仔制作",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1909047283485671924",
    imageUrl: "/examples/funko-pop-james-bond-figure-and-box.png",
    prompt: "把照片中的人物变成 Funko Pop 公仔包装盒的风格，以等距视角（isometric）呈现，并在包装盒上标注标题为\"JAMES BOND\"。包装盒内展示的是照片中人物形象，旁边搭配有人物的必备物品。",
    requiresReferenceImage: true,
    tags: ["Funko", "公仔", "等距视角", "包装"]
  }
];

export const authors = [
  { name: 'balconychy', count: 5, twitter: 'https://twitter.com/balconychy' },
  { name: 'dotey', count: 10, twitter: 'https://twitter.com/dotey' },
  { name: 'AnimeAI', count: 2, twitter: 'https://twitter.com/AnimeAI' },
  { name: 'ZHO_ZHO_ZHO', count: 7, twitter: 'https://twitter.com/ZHO_ZHO_ZHO' },
]; 