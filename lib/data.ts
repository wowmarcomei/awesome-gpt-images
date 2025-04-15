import { Case } from '../types'; 

export const cases: Case[] = [
  {
    id: "1",
    title: {
      zh: "Q版求婚场景",
      en: "Q-version Proposal Scene"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1909417750587486469", // Correct URL format
    image: "/examples/example_proposal_scene_q_realistic.jpeg",
    prompt: {
      zh: "将照片里的两个人转换成Q版 3D人物，场景换成求婚，背景换成淡雅五彩花瓣做的拱门，背景换成浪漫颜色，地上散落着玫瑰花瓣。除了人物采用Q版 3D人物风格，其他环境采用真实写实风格。",
      en: "Convert the two people in the photo into Q-version 3D characters. Change the scene to a proposal, the background to an arch made of elegant multi-colored petals with romantic colors, and scatter rose petals on the ground. Except for the characters using the Q-version 3D style, the rest of the environment should be realistic."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["Q版", "3D", "求婚"],
      en: ["Chibi", "3D", "Proposal"]
    }
  },
  {
    id: "2",
    title: {
      zh: "立体相框",
      en: "3D Photo Frame"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1908238003169903060", // Correct URL format
    image: "/examples/example_polaroid_breakout.png",
    prompt: {
      zh: "将场景中的角色转化为3D Q版风格，放在一张拍立得照片上，相纸被一只手拿着，照片中的角色正从拍立得照片中走出，呈现出突破二维相片边框、进入二维现实空间的视觉效果。",
      en: "Transform the character in the scene into a 3D Chibi style, placed on a Polaroid photo being held by a hand. The character is stepping out of the Polaroid photo, creating a visual effect of breaking through the 2D photo frame and entering the 2D real space."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["3D", "Q版", "创意"],
      en: ["3D", "Chibi", "Creative"]
    }
  },
  {
    id: "3",
    title: {
      zh: "复古宣传海报",
      en: "Vintage Promotional Poster"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1905251524248248650", // Correct URL format
    image: "/examples/example_vintage_poster.jpeg",
    prompt: {
      zh: "复古宣传海报风格，突出中文文字，背景为红黄放射状图案。画面中心位置有一位美丽的年轻女性，以精致复古风格绘制，面带微笑，气质优雅，具有亲和力。主题是GPT最新AI绘画服务的广告促销，强调'惊爆价9.9/张'、'适用各种场景、图像融合、局部重绘'、'每张提交3次修改'、'AI直出效果，无需修改'，底部醒目标注'有意向点右下\"我想要\"'，右下角绘制一个手指点击按钮动作，左下角展示OpenAI标志。",
      en: "Vintage promotional poster style, emphasizing Chinese text, with a red-yellow radial pattern background. In the center, a beautiful young woman drawn in exquisite vintage style, smiling, elegant, and approachable. The theme is advertising GPT's latest AI drawing service, highlighting 'Shocking price 9.9/image', 'Suitable for various scenes, image fusion, partial redrawing', '3 revisions per submission', 'Direct AI output, no editing needed'. The bottom prominently features 'Click bottom right \"I want it\" if interested', with a finger clicking button action drawn in the bottom right, and the OpenAI logo displayed in the bottom left."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["复古", "海报", "广告"],
      en: ["Vintage", "Poster", "Advertisement"]
    }
  },
  {
    id: "4",
    title: {
      zh: "Q 版中式婚礼图",
      en: "Q-version Chinese Wedding Illustration"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1909418699150237917", // Correct URL format
    image: "/examples/example_q_chinese_wedding.jpeg",
    prompt: {
      zh: "将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景\"双喜字\"剪纸风格图案。 服饰要求：写实，男士身着长袍马褂，主体为红色，上面以金色绣龙纹图案，彰显尊贵大气 ，胸前系着大红花，寓意喜庆吉祥。女士所穿是秀禾服，同样以红色为基调，饰有精美的金色花纹与凤凰刺绣，展现出典雅华丽之感 ，头上搭配花朵发饰，增添柔美温婉气质。二者皆为中式婚礼中经典着装，蕴含着对新人婚姻美满的祝福。 头饰要求： 男士：中式状元帽，主体红色，饰有金色纹样，帽顶有精致金饰，尽显传统儒雅庄重。 女士：凤冠造型，以红色花朵为中心，搭配金色立体装饰与垂坠流苏，华丽富贵，古典韵味十足。",
      en: "Convert the two people in the photo into Q-version 3D characters for a traditional Chinese wedding. Use bright red colors and a 'Double Happiness' paper-cut style pattern for the background. Attire requirements: Realistic. The man wears a traditional gown (changpao magua), mainly red with gold embroidered dragon patterns, showing nobility and grandeur, with a large red flower pinned to his chest, symbolizing celebration and auspiciousness. The woman wears a Xiuhe suit, also based on red, adorned with exquisite gold patterns and phoenix embroidery, displaying elegance and splendor. She wears flower hair accessories, adding a soft and gentle touch. Both outfits are classic for Chinese weddings, carrying blessings for a happy marriage. Headdress requirements: Man: Traditional scholar hat (zhuangyuanmao), mainly red with gold patterns and exquisite gold ornaments on top, showing traditional elegance and solemnity. Woman: Phoenix crown style, centered with red flowers, matched with gold three-dimensional decorations and dangling tassels, looking magnificent, rich, and full of classical charm."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["Q版", "中式婚礼", "3D"],
      en: ["Chibi", "Chinese Wedding", "3D"]
    }
  },
  {
    id: "5",
    title: {
      zh: "吉卜力风格",
      en: "Ghibli Style"
    },
    author: {
      name: "AnimeAI",
      twitter: "https://animeai.online" // Correct URL format (Website link)
    },
    originalLink: "https://animeai.online/#demo-gallery", // Correct URL format
    image: "/examples/example_ghibli-style-mona-lisa.png", // Absolute URL
    prompt: {
      zh: "以吉卜力风格重绘这张照片",
      en: "Redraw this photo in Ghibli style"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["吉卜力", "风格转换", "动漫"],
      en: ["Ghibli", "Style Transfer", "Anime"]
    }
  },
  {
    id: "6",
    title: {
      zh: "角色穿越传送门",
      en: "Character Crossing Portal"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1908910838636765204", // Correct URL format
    image: "/examples/example_portal_crossing_handhold.jpeg",
    prompt: {
      zh: "照片中的角色的 3D Q 版形象穿过传送门，牵着观众的手，在将观众拉向前时动态地回头一看。传送门外的背景是观众的现实世界，一个典型的程序员的书房，有书桌，显示器和笔记本电脑，传送门内是角色所处的3D Q 版世界，细节可以参考照片，整体呈蓝色调，和现实世界形成鲜明对比。传送门散发着神秘的蓝色和紫色色调，是两个世界之间的完美椭圆形框架处在画面中间。从第三人称视角拍摄的摄像机角度，显示观看者的手被拉入角色世界。3：2 的宽高比。",
      en: "The 3D Q-version image of the character in the photo passes through a portal, holding the viewer's hand, dynamically looking back while pulling the viewer forward. The background outside the portal is the viewer's real world, a typical programmer's study with a desk, monitor, and laptop. Inside the portal is the character's 3D Q-version world, details can refer to the photo, overall in blue tones, contrasting sharply with the real world. The portal emits mysterious blue and purple hues, serving as a perfect oval frame between the two worlds in the center of the picture. Camera angle from a third-person perspective, showing the viewer's hand being pulled into the character's world. Aspect ratio 3:2."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["3D", "Q版", "传送门", "创意"],
      en: ["3D", "Chibi", "Portal", "Creative"]
    }
  },
  {
    id: "7",
    title: {
      zh: "个性化房间设计",
      en: "Personalized Room Design"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1910698005193515370", // Correct URL format
    image: "/examples/example_personalized_room.png",
    prompt: {
      zh: "为我生成我的房间设计（床、书架、沙发、电脑桌和电脑、墙上挂着绘画、绿植，窗外是城市夜景。可爱 3d 风格，c4d 渲染，轴测图。",
      en: "Generate my room design for me (bed, bookshelf, sofa, computer desk and computer, paintings hanging on the wall, green plants, city night view outside the window). Cute 3D style, C4D rendering, axonometric view."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["房间设计", "3D", "可爱", "C4D"],
      en: ["Room Design", "3D", "Cute", "C4D"]
    }
  },
  {
    id: "8",
    title: {
      zh: "乐高收藏品",
      en: "Lego Collectible"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1910644499354968091", // Correct URL format
    image: "/examples/example_lego_collectible.jpeg",
    prompt: {
      zh: "根据我上传的照片，生成一张纵向比例的照片，使用以下提示词：\n\n经典乐高人偶风格，一个微缩场景 —— 一只动物站在我身旁。这只动物的配色与我相匹配。\n\n请根据你对我的理解来创造这只动物（你可以选择任何你认为适合我的动物，不论是真实存在的，还是超现实的、幻想的，只要你觉得符合我的气质即可）。\n\n整个场景设定在一个透明玻璃立方体内，布景极简。\n\n微缩场景的底座是哑光黑色，配以银色装饰，风格简约且时尚。\n\n底座上有一块优雅雕刻的标签牌，字体为精致的衬线体，上面写着该动物的名称。\n\n底部设计中还巧妙融入了类似自然历史博物馆展示的生物学分类信息，以精细蚀刻的方式呈现。\n\n整体构图像是一件高端收藏艺术品：精心打造、策展般呈现、灯光细致。\n\n构图重在平衡。背景为渐变色，从深色到浅色过渡（颜色基于主色调进行选择）。",
      en: "Based on the photo I uploaded, generate a portrait aspect ratio photo using the following prompt:\n\nClassic Lego minifigure style, a miniature scene - an animal stands beside me. This animal's color scheme matches mine.\n\nPlease create this animal based on your understanding of me (you can choose any animal you think suits me, whether real, surreal, or fantastical, as long as you feel it fits my temperament).\n\nThe entire scene is set within a transparent glass cube with a minimalist setting.\n\nThe base of the miniature scene is matte black with silver accents, minimalist and stylish.\n\nOn the base is an elegantly engraved label plate with a delicate serif font, displaying the animal's name.\n\nThe bottom design subtly incorporates biological classification information similar to a natural history museum display, presented with fine etching.\n\nThe overall composition resembles a high-end collectible art piece: meticulously crafted, curated presentation, detailed lighting.\n\nThe composition emphasizes balance. The background is a gradient, transitioning from dark to light (colors selected based on the main color scheme)."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["乐高", "微缩", "收藏品"],
      en: ["Lego", "Miniature", "Collectible"]
    }
  },
   {
    id: "9",
    title: {
      zh: "气球名画",
      en: "Balloon Masterpiece"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1910976632141267237", // Correct URL format
    image: "/examples/example_pearl_earring_balloon.jpeg",
    prompt: {
      zh: "将图片中的人物变成玩偶形状的氦气球",
      en: "Transform the person in the picture into a doll-shaped helium balloon"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["气球", "名画", "创意"],
      en: ["Balloon", "Masterpiece", "Creative"]
    }
  },
  {
    id: "10",
    title: {
      zh: "讽刺漫画生成",
      en: "Satirical Cartoon Generation"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1910514811756065159", // Correct URL format
    image: "/examples/example_maga_hat_cartoon.jpeg",
    prompt: {
      zh: "一幅讽刺漫画风格的插画，采用复古美式漫画风格，背景是一个多层货架，货架上都是一样的红色棒球帽，帽子正面印有大字标语\"MAKE AMERICA GREAT AGAIN\"，帽侧贴着白色标签写着\"MADE IN CHINA\"，特写视角聚焦其中一顶红色棒球帽。画面下方有价格牌，原价\"$50.00\"被粗黑线X划掉，改为\"$77.00\"，色调为怀旧的土黄与暗红色调，阴影处理带有90年代复古印刷质感。整体构图风格夸张讽刺，具讽刺政治消费主义的意味。",
      en: "A satirical cartoon style illustration, using a retro American comic style. The background is a multi-layered shelf filled with identical red baseball caps. The front of the caps has the large slogan \"MAKE AMERICA GREAT AGAIN\", and the side has a white label saying \"MADE IN CHINA\". A close-up focuses on one of the red baseball caps. Below, there's a price tag: the original price \"$50.00\" is crossed out with a thick black X and changed to \"$77.00\". The color palette is nostalgic earthy yellow and dark red tones, with shading that has a 90s retro print texture. The overall composition is exaggerated and satirical, implying a critique of political consumerism."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["讽刺", "漫画", "复古"],
      en: ["Satire", "Cartoon", "Retro"]
    }
  },
  {
    id: "11",
    title: {
      zh: "PS2 游戏封面 (GTA x Shrek)",
      en: "PS2 Game Cover (GTA x Shrek)"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1904978767090524372", // Correct URL format
    image: "/examples/example_ps2_gta_shrek.jpeg",
    prompt: {
      zh: "你能创建一个《侠盗猎车手：遥远王国》的PS2游戏盒吗？这是一个基于怪物史瑞克宇宙的GTA游戏。", // Translated from English
      en: "Can you create a PS2 video game case of \"Grand Theft Auto: Far Far Away\" a GTA based in the Shrek Universe."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["游戏封面", "PS2", "恶搞"],
      en: ["Game Cover", "PS2", "Parody"]
    }
  },
  {
    id: "12",
    title: {
      zh: "3D 情侣珠宝盒摆件",
      en: "3D Couple Jewelry Box Collectible"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1909332895115714835", // Correct URL format
    image: "/examples/example_3d_collectible_couple_box.jpeg",
    prompt: {
      zh: "根据照片上的内容打造一款细致精美、萌趣可爱的3D渲染收藏摆件，装置在柔和粉彩色调、温馨浪漫的展示盒中。展示盒为浅奶油色搭配柔和的金色装饰，形似精致的便携珠宝盒。打开盒盖，呈现出一幕温暖浪漫的场景：两位Q版角色正甜蜜相望。盒顶雕刻着\"FOREVER TOGETHER\"（永远在一起）的字样，周围点缀着小巧精致的星星与爱心图案。\n盒内站着照片上的女性，手中捧着一束小巧的白色花束。她的身旁是她的伴侣，照片上的男性。两人都拥有大而闪亮、充满表现力的眼睛，以及柔和、温暖的微笑，传递出浓浓的爱意和迷人的气质。\n他们身后有一扇圆形窗户，透过窗户能看到阳光明媚的中国古典小镇天际线和轻柔飘浮的云朵。盒内以温暖的柔和光线进行照明，背景中漂浮着花瓣点缀气氛。整个展示盒和角色的色调优雅和谐，营造出一个奢华而梦幻的迷你纪念品场景。\n尺寸：9:16",
      en: "Create a detailed, exquisite, cute, and lovely 3D rendered collectible based on the content of the photo, housed in a soft pastel-toned, warm, and romantic display box. The display box is light cream colored with soft gold accents, resembling a delicate portable jewelry box. Opening the lid reveals a warm and romantic scene: two Q-version characters are gazing sweetly at each other. The top of the box is engraved with the words \"FOREVER TOGETHER\", surrounded by small, delicate stars and heart patterns.\nInside the box stands the woman from the photo, holding a small bouquet of white flowers. Beside her is her partner, the man from the photo. Both have large, shiny, expressive eyes and soft, warm smiles, conveying deep affection and charming personalities.\nBehind them is a circular window, through which a sunny classical Chinese town skyline and gently floating clouds can be seen. The box is illuminated with warm, soft light, and floating petals add to the atmosphere in the background. The color palette of the entire display box and characters is elegant and harmonious, creating a luxurious and dreamy miniature souvenir scene.\nAspect ratio: 9:16"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["3D", "Q版", "情侣", "珠宝盒"],
      en: ["3D", "Chibi", "Couple", "Jewelry Box"]
    }
  },
  {
    id: "13",
    title: {
      zh: "3D Q版风格",
      en: "3D Q-version Style"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1908194518345678865", // Correct URL format
    image: "/examples/example_photo_to_3d_q.png",
    prompt: {
      zh: "将场景中的角色转化为3D Q版风格，同时保持原本的场景布置和服装造型不变。",
      en: "Transform the character in the scene into a 3D Q-version style, while keeping the original scene layout and costume design unchanged."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["3D", "Q版", "风格转换"],
      en: ["3D", "Chibi", "Style Transfer"]
    }
  },
   {
    id: "14",
    title: {
      zh: "《海贼王》主题手办制作",
      en: "One Piece Themed Figure Creation"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1909047547563213145", // Correct URL format
    image: "/examples/example_one_piece_figure_creation.png",
    prompt: {
      zh: "把照片中的人物变成《海贼王》（One Piece）动漫主题手办包装盒的风格，以等距视角（isometric）呈现。包装盒内展示的是基于照片人物的《海贼王》动漫画风设计的形象，旁边搭配有日常必备物品（手枪、手表、西装和皮鞋）同时，在包装盒旁边还应呈现该手办本体的实物效果，采用逼真的、具有真实感的渲染风格。",
      en: "Transform the person in the photo into the style of a One Piece anime-themed figure packaging box, presented in an isometric view. Inside the box, display the One Piece anime-style designed image based on the person in the photo, accompanied by everyday essential items (pistol, watch, suit, and leather shoes). Additionally, next to the packaging box, present the actual figure itself with a realistic, true-to-life rendering style."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["海贼王", "手办", "等距视角", "动漫"],
      en: ["One Piece", "Figure", "Isometric", "Anime"]
    }
  },
  {
    id: "15",
    title: {
      zh: "讽刺海报生成",
      en: "Satirical Poster Generation"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1905287637084274742", // Correct URL format
    image: "/examples/example_gpt_involution_poster.png",
    prompt: {
      zh: "为我生成讽刺海报：GPT 4o 狂卷，都别干图像AI了 还是送外卖吧",
      en: "Generate a satirical poster for me: GPT-4o is intensifying competition, forget image AI, let's just deliver food."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["讽刺", "海报", "AI"],
      en: ["Satire", "Poster", "AI"]
    }
  },
   {
    id: "16",
    title: {
      zh: "布丁老虎机",
      en: "Pudding Slot Machine"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1911107569898471818", // Correct URL format
    image: "/examples/example_pudding_slot.jpeg",
    prompt: {
      zh: "将图标[🎰]变成美味可口布丁造型，Q弹质感，背景粉白渐变，整体甜美、轻盈、可爱",
      en: "Transform the icon [🎰] into a delicious pudding shape, bouncy texture, pink and white gradient background, overall sweet, light, and cute."
    },
    requiresReferenceImage: false, // Icon is provided in prompt
    tags: {
      zh: ["布丁", "可爱", "图标转换", "食物"],
      en: ["Pudding", "Cute", "Icon Transformation", "Food"]
    }
  },
  {
    id: "17",
    title: {
      zh: "数码宝贝风格图",
      en: "Digimon Style Illustration"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1911001291280859559", // Correct URL format
    image: "/examples/example_digimon_style.jpeg",
    prompt: {
      zh: "为我生成一张数码宝贝风格的图片，并为我匹配一只数码宝贝",
      en: "Generate a Digimon-style picture for me, and match me with a Digimon."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["数码宝贝", "风格转换", "动漫"],
      en: ["Digimon", "Style Transfer", "Anime"]
    }
  },
  {
    id: "18",
    title: {
      zh: "皮克斯3D风格",
      en: "Pixar 3D Style"
    },
    author: {
      name: "AnimeAI",
      twitter: "https://animeai.online" // Correct URL format (Website link)
    },
    originalLink: "https://animeai.online/#demo-gallery", // Correct URL format
    image: "/examples/example_pixar-style-godfather-scene.png", // Absolute URL
    prompt: {
      zh: "以皮克斯 3D 风格重绘这张照片",
      en: "Redraw this photo in Pixar 3D style"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["皮克斯", "3D", "风格转换", "动漫"],
      en: ["Pixar", "3D", "Style Transfer", "Animation"]
    }
  },
    {
    id: "19",
    title: {
      zh: "语文课本重绘",
      en: "Textbook Illustration Redraw"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1906982626365178361", // Correct URL format
    image: "/examples/example_textbook_redraw.jpeg",
    prompt: {
      zh: "重绘语文课本插画",
      en: "Redraw the language textbook illustration"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["重绘", "插画", "课本"],
      en: ["Redraw", "Illustration", "Textbook"]
    }
  },
  {
    id: "20",
    title: {
      zh: "四格漫画 (相对论)",
      en: "Four-Panel Manga (Relativity)"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1904980568107819060", // Correct URL format
    image: "/examples/example_relativity_manga.jpeg",
    prompt: {
      zh: "制作一页描述相对论的彩色漫画。加点幽默感。", // Translated from English
      en: "make a colorful page of manga describing the theory of relativity. add some humor"
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["漫画", "四格", "科学", "幽默"],
      en: ["Manga", "Four-panel", "Science", "Humor"]
    }
  },
  {
    id: "21",
    title: {
      zh: "简笔画表情包",
      en: "Stick Figure Emoji Pack"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1909907741948399873", // Correct URL format
    image: "/examples/example_einstein_stickfigure_emoji.jpeg",
    prompt: {
      zh: "(分为两步)\n先把图片人物变成手绘简笔画风格\n然后把简笔画按照吐舌头、微笑、皱眉、惊讶、思考、眨眼生成一系列表情包",
      en: "(Two steps)\nFirst, turn the person in the picture into a hand-drawn stick figure style.\nThen, generate a series of emoji packs from the stick figure showing expressions like sticking tongue out, smiling, frowning, surprised, thinking, winking."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["表情包", "简笔画", "风格转换"],
      en: ["Emoji Pack", "Stick Figure", "Style Transfer"]
    }
  },
  {
    id: "22",
    title: {
      zh: "小红书封面",
      en: "Xiaohongshu Cover"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1905507936526627078", // Correct URL format
    image: "/examples/example_notebook_promo.png",
    prompt: {
      zh: "画图：画一个小红书封面。\n要求：\n有足够的吸引力吸引用户点击；\n字体醒目，选择有个性的字体；\n文字大小按重要度分级，体现文案的逻辑结构；\n标题是普通文字的至少2倍；\n文字段落之间留白。\n只对要强调的文字用醒目色吸引用户注意；\n背景使用吸引眼球的图案（包括不限于纸张，记事本，微信聊天窗口，选择一种）\n使用合适的图标或图片增加视觉层次，但要减少干扰。\n\n文案：重磅！ChatGPT又变强了！\n多任务处理更牛✨\n编程能力更强💪\n创造力爆表🎨\n快来试试！\n\n图像9:16比例",
      en: "Draw a picture: Draw a Xiaohongshu cover.\nRequirements:\nAttractive enough to entice user clicks;\nEye-catching font, choose a distinctive font;\nFont size graded by importance, reflecting the logical structure of the copy;\nTitle at least 2 times larger than regular text;\nWhitespace between text paragraphs.\nUse striking colors only for emphasized text to attract user attention;\nUse an eye-catching pattern for the background (including but not limited to paper, notebook, WeChat chat window, choose one);\nUse appropriate icons or images to add visual hierarchy, but reduce interference.\n\nCopy: Big news! ChatGPT got stronger again!\nMultitasking is better✨\nProgramming skills stronger💪\nCreativity off the charts🎨\nCome try it!\n\nImage aspect ratio 9:16"
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["小红书", "封面", "社交媒体"],
      en: ["Xiaohongshu", "Cover", "Social Media"]
    }
  },
   {
    id: "23",
    title: {
      zh: "《泰坦尼克号》模仿",
      en: "Titanic Parody"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1909916265067557299", // Correct URL format
    image: "/examples/example_titanic_q_realistic.jpeg",
    prompt: {
      zh: "将附图中的人物转换成可爱Q版3D造型\n场景：在豪华游轮最顶尖的船头，船头是尖的。\n男士带着女士站在泰坦尼克号船头，男士双手搂着女士的腰，女士双臂伸展穿着连衣裙，迎着风，脸上洋溢着自由与畅快。\n此时天色呈现出黄昏的暖色调，大海在船下延展 。\n除了人物用Q版3D造型以外，其他环境都是实物。",
      en: "Convert the people in the attached picture into cute Q-version 3D models.\nScene: At the very bow of a luxury cruise ship, the bow is pointed.\nThe man holds the woman at the bow of the Titanic; the man has his hands around the woman's waist, the woman has her arms outstretched, wearing a dress, facing the wind, her face beaming with freedom and joy.\nThe sky shows the warm colors of dusk, and the sea stretches out below the ship.\nExcept for the characters using Q-version 3D models, the rest of the environment is realistic."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["Q版", "3D", "泰坦尼克号", "情侣"],
      en: ["Chibi", "3D", "Titanic", "Couple"]
    }
  },
  {
    id: "24",
    title: {
      zh: "Funko Pop 公仔制作",
      en: "Funko Pop Figure Creation"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1909047283485671924", // Correct URL format
    image: "/examples/funko-pop-james-bond-figure-and-box.png",
    prompt: {
      zh: "把照片中的人物变成 Funko Pop 公仔包装盒的风格，以等距视角（isometric）呈现，并在包装盒上标注标题为\"JAMES BOND\"。包装盒内展示的是照片中人物形象，旁边搭配有人物的必备物品（手枪、手表、西装、其他）同时，在包装盒旁边还应呈现该公仔本体的实物效果，采用逼真的、具有真实感的渲染风格。",
      en: "Transform the person in the photo into the style of a Funko Pop figure packaging box, presented in an isometric view, and label the box with the title \"JAMES BOND\". Inside the box, display the image of the person from the photo, accompanied by the character's essential items (pistol, watch, suit, others). Additionally, next to the packaging box, present the actual figure itself with a realistic, true-to-life rendering style."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["Funko Pop", "公仔", "等距视角", "詹姆斯邦德"],
      en: ["Funko Pop", "Figure", "Isometric", "James Bond"]
    }
  },
  {
    id: "25",
    title: {
      zh: "极简主义 3D 插画",
      en: "Minimalist 3D Illustration"
    },
    author: {
      name: "0xdlk",
      twitter: "https://x.com/0xdlk" // Correct URL format
    },
    originalLink: "https://x.com/0xdlk/status/1906843247432929642", // Correct URL format
    image: "/examples/example_minimalist_3d_toilet.png",
    prompt: {
       // Using English prompt directly as it's JSON configuration
      zh: "生成一个具有以下 JSON 配置文件的马桶：\n{\n  \"art_style_profile\": {\n    \"style_name\": \"Minimalist 3D Illustration\",\n    \"visual_elements\": {\n      \"shape_language\": \"Rounded edges, smooth and soft forms with simplified geometry\",\n      \"colors\": {\n        \"primary_palette\": [\"Soft beige, light gray, warm orange\"],\n        \"accent_colors\": [\"Warm orange for focal elements\"],\n        \"shading\": \"Soft gradients with smooth transitions, avoiding harsh shadows or highlights\"\n      },\n      \"lighting\": {\n        \"type\": \"Soft, diffused lighting\",\n        \"source_direction\": \"Above and slightly to the right\",\n        \"shadow_style\": \"Subtle and diffused, no sharp or high-contrast shadows\"\n      },\n      \"materials\": {\n        \"surface_texture\": \"Matte, smooth surfaces with subtle shading\",\n        \"reflectivity\": \"Low to none, avoiding glossiness\"\n      },\n      \"composition\": {\n        \"object_presentation\": \"Single, central object displayed in isolation with ample negative space\",\n        \"perspective\": \"Slightly angled, giving a three-dimensional feel without extreme depth\",\n        \"background\": \"Solid, muted color that complements the object without distraction\"\n      },\n      \"typography\": {\n        \"font_style\": \"Minimalistic, sans-serif\",\n        \"text_placement\": \"Bottom-left corner with small, subtle text\",\n        \"color\": \"Gray, low-contrast against the background\"\n      },\n      \"rendering_style\": {\n        \"technique\": \"3D render with simplified, low-poly aesthetics\",\n        \"detail_level\": \"Medium detail, focusing on form and color over texture or intricacy\"\n      }\n    },\n    \"purpose\": \"To create clean, aesthetically pleasing visuals that emphasize simplicity, approachability, and modernity.\"\n  }\n}", // Simplified Translation
      en: "Generate a toilet with the following JSON profile:\n{\n  \"art_style_profile\": {\n    \"style_name\": \"Minimalist 3D Illustration\",\n    \"visual_elements\": {\n      \"shape_language\": \"Rounded edges, smooth and soft forms with simplified geometry\",\n      \"colors\": {\n        \"primary_palette\": [\"Soft beige, light gray, warm orange\"],\n        \"accent_colors\": [\"Warm orange for focal elements\"],\n        \"shading\": \"Soft gradients with smooth transitions, avoiding harsh shadows or highlights\"\n      },\n      \"lighting\": {\n        \"type\": \"Soft, diffused lighting\",\n        \"source_direction\": \"Above and slightly to the right\",\n        \"shadow_style\": \"Subtle and diffused, no sharp or high-contrast shadows\"\n      },\n      \"materials\": {\n        \"surface_texture\": \"Matte, smooth surfaces with subtle shading\",\n        \"reflectivity\": \"Low to none, avoiding glossiness\"\n      },\n      \"composition\": {\n        \"object_presentation\": \"Single, central object displayed in isolation with ample negative space\",\n        \"perspective\": \"Slightly angled, giving a three-dimensional feel without extreme depth\",\n        \"background\": \"Solid, muted color that complements the object without distraction\"\n      },\n      \"typography\": {\n        \"font_style\": \"Minimalistic, sans-serif\",\n        \"text_placement\": \"Bottom-left corner with small, subtle text\",\n        \"color\": \"Gray, low-contrast against the background\"\n      },\n      \"rendering_style\": {\n        \"technique\": \"3D render with simplified, low-poly aesthetics\",\n        \"detail_level\": \"Medium detail, focusing on form and color over texture or intricacy\"\n      }\n    },\n    \"purpose\": \"To create clean, aesthetically pleasing visuals that emphasize simplicity, approachability, and modernity.\"\n  }\n}"
    },
    requiresReferenceImage: false, // Object is defined in JSON
    tags: {
      zh: ["3D", "极简主义", "插画", "配置"],
      en: ["3D", "Minimalist", "Illustration", "Configuration"]
    }
  },
  {
    id: "26",
    title: {
      zh: "名画人物麦片广告",
      en: "Masterpiece Character Cereal Ad"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1909542765857587310", // Correct URL format
    image: "/examples/example_master_oats_ad.png",
    prompt: {
      zh: "《大师麦片》：根据我上传的照片的人物特征判断，为他生成一个符合他特质的燕麦片搭配（比如蔬菜、水果、酸奶、粗粮等等）和包装设计，然后生成他作为麦片包装盒封面人物 加 相应麦片搭配的广告封面，人物要保持特征、可爱Q版3d、c4d渲染风格，麦片所放置的地方的风格也要符合设定，比如放在厨房、超市 极简主义的设计台上等等，先做好设定，再生成图像",
      en: "'Master Oats': Based on the characteristics of the person in the photo I uploaded, generate an oatmeal combination (e.g., vegetables, fruits, yogurt, whole grains, etc.) and packaging design that matches their traits. Then, generate an advertisement cover featuring them as the cover character on the cereal box plus the corresponding oatmeal combination. The character should retain their features, be in a cute Q-version 3D style with C4D rendering. The setting where the oatmeal is placed should also match the concept, e.g., kitchen, supermarket, minimalist design counter, etc. First establish the setting, then generate the image."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["广告", "麦片", "名画", "Q版", "3D"],
      en: ["Advertisement", "Cereal", "Masterpiece", "Chibi", "3D"]
    }
  },
  {
    id: "27",
    title: {
      zh: "Q 版表情包制作",
      en: "Q-version Emoji Pack Creation"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1909800530739679488", // Correct URL format
    image: "/examples/example_chibi_emoji_pack.png",
    prompt: {
      zh: "创作一套全新的 chibi sticker，共六个独特姿势，以用户形象为主角：\n1. 双手比出剪刀手，俏皮地眨眼；\n2. 泪眼汪汪、嘴唇微微颤动，呈现可爱哭泣的表情；\n3. 张开双臂，做出热情的大大拥抱姿势；\n4. 侧卧入睡，靠着迷你枕头，带着甜甜的微笑；\n5. 自信满满地向前方伸手指，周围点缀闪亮特效；\n6. 手势飞吻，周围飘散出爱心表情。\n保留 chibi 美学风格：夸张有神的大眼睛、柔和的面部线条、活泼俏皮的短款黑色发型、配以大胆领口设计的白色服饰，背景使用充满活力的红色，并搭配星星或彩色纸屑元素进行装饰。周边适当留白。\nAspect ratio: 9:16",
      en: "Create a new set of chibi stickers, six unique poses, featuring the user's image as the main character:\n1. Making a peace sign with both hands, winking playfully;\n2. Teary-eyed, lips slightly trembling, showing a cute crying expression;\n3. Arms wide open, making a warm big hug gesture;\n4. Sleeping on the side, leaning against a mini pillow, with a sweet smile;\n5. Confidently pointing forward, surrounded by sparkling effects;\n6. Blowing a kiss gesture, with heart emojis floating around.\nMaintain the chibi aesthetic: exaggerated, expressive large eyes, soft facial lines, lively short black hairstyle, paired with a white outfit featuring a bold neckline design. Use a vibrant red background decorated with stars or confetti elements. Leave appropriate whitespace around the edges.\nAspect ratio: 9:16"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["表情包", "Q版", "贴纸"],
      en: ["Emoji Pack", "Chibi", "Sticker"]
    }
  },
  {
    id: "28",
    title: {
      zh: "扁平贴纸设计",
      en: "Flat Sticker Design"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1908044836953108490", // Correct URL format
    image: "/examples/example_flat_sticker_pearl_earring.jpeg",
    prompt: {
      zh: "把这张照片设计成一个极简扁平插画风格的Q版贴纸，厚白边，保留人物特征，风格要可爱一些，人物要超出圆形区域边框，圆形区域要为纯色不要3d感，透明背景",
      en: "Design this photo into a minimalist flat illustration style Q-version sticker, with a thick white border. Retain the character's features, make the style cuter. The character should extend beyond the circular area border. The circular area should be a solid color without a 3D feel. Transparent background."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["贴纸", "扁平插画", "Q版", "可爱"],
      en: ["Sticker", "Flat Illustration", "Chibi", "Cute"]
    }
  },
  {
    id: "29",
    title: {
      zh: "名画人物 OOTD",
      en: "Masterpiece Character OOTD"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1909892294217781714", // Correct URL format
    image: "/examples/example_pearl_earring_ootd.png",
    prompt: {
      zh: "为图片人物生成不同职业风的OOTD，时尚穿搭和配饰，和人物色系一致的纯色背景，Q版 3d，c4d渲染，保持人脸特征，姿势都要保持一致，人物的比例腿很修长\n\n构图：9:16\n顶部文字：OOTD，左侧为人物ootd q版形象，右侧为穿搭的单件展示\n\n先来第一个职业：时尚设计师",
      en: "Generate OOTDs (Outfit Of The Day) in different professional styles for the person in the picture. Include fashionable outfits and accessories, a solid color background matching the character's color scheme. Style: Q-version 3D, C4D rendering. Maintain facial features and consistent posture. The character should have proportionally long legs.\n\nComposition: 9:16\nTop text: OOTD. Left side: Q-version image of the character's OOTD. Right side: Display of individual outfit items.\n\nStart with the first profession: Fashion Designer"
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["OOTD", "名画", "时尚", "Q版", "3D"],
      en: ["OOTD", "Masterpiece", "Fashion", "Chibi", "3D"]
    }
  },
  {
    id: "30",
    title: {
      zh: "35mm 胶片风格飞岛",
      en: "35mm Film Style Flying Island"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1905020833451348283", // Correct URL format
    image: "/examples/example_35mm_moscow_flying_island.jpeg",
    prompt: {
      zh: "莫斯科漂浮在空中的飞岛上的 35 毫米照片", // Translated from English
      en: "35 mm photo of Moscow floating in the sky on a flying islands"
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["胶片", "飞岛", "莫斯科", "超现实"],
      en: ["Film", "Flying Island", "Moscow", "Surreal"]
    }
  },
  {
    id: "31",
    title: {
      zh: "动漫贴纸集合",
      en: "Anime Sticker Collection"
    },
    author: {
      name: "richardchang",
      twitter: "https://x.com/richardchang" // Correct URL format
    },
    originalLink: "https://x.com/richardchang/status/1909086122959139312", // Correct URL format
    image: "/examples/example_naruto_stickers.jpeg",
    prompt: {
      zh: "火影忍者贴纸", // Translated from English
      en: "Naruto stickers"
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["贴纸", "动漫", "火影忍者"],
      en: ["Sticker", "Anime", "Naruto"]
    }
  },
    {
    id: "32",
    title: {
      zh: "纸艺剪贴风格招聘广告",
      en: "Paper Cutout Style Job Ad"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1905021792642564406", // Correct URL format
    image: "/examples/example_paper_cutout_job_ad.jpeg",
    prompt: {
      zh: "图片展示了专业的汽车和卡车司机在工作中，令人印象深刻的城市和乡村速度，积极的团队环境以及车队的现代视觉效果——所有这些都宣传了一个司机职位空缺，提供有竞争力的薪酬、灵活的工作时间和明确的机构呼吁：“今天申请——我们明天开始！”", // Translated from English
      en: "The image shows professional drivers of cars and trucks at work, impressive urban and rural speeds, a positive team environment and modern visuals of the fleet - all this advertises a vacancy for drivers with competitive pay, flexible working hours and a clear call to institutions: \"Apply today - we will start tomorrow!\""
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["纸艺", "剪贴", "招聘", "广告"],
      en: ["Paper Art", "Cutout", "Hiring", "Advertisement"]
    }
  },
   {
    id: "33",
    title: {
      zh: "全家福婚纱照",
      en: "Family Wedding Photo"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1909426314643222595", // Correct URL format
    image: "/examples/example_family_wedding_photo_q.jpeg",
    prompt: {
      zh: "将照片里的转换成Q版 3D人物，父母婚礼服饰，孩子是美丽的花童。 父母，西式婚礼服饰，父亲礼服，母亲婚纱。孩子手捧鲜花。 背景是五彩鲜花做的拱门。 除了人物是3D Q版，环境其他都是写实。 整体放在一个相框里。",
      en: "Convert the people in the photo into Q-version 3D characters. Parents in wedding attire, child as a beautiful flower girl/boy. Parents in Western wedding attire: father in a suit, mother in a wedding dress. Child holding flowers. The background is an arch made of colorful flowers. Except for the characters being 3D Q-version, the rest of the environment is realistic. Place the whole scene inside a photo frame."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["全家福", "婚纱照", "Q版", "3D"],
      en: ["Family Portrait", "Wedding Photo", "Chibi", "3D"]
    }
  },
  {
    id: "34",
    title: {
      zh: "手绘信息图卡片",
      en: "Hand-drawn Infographic Card"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1907903480678985784", // Correct URL format
    image: "/examples/example_hand_drawn_infographic_cognition.jpeg",
    prompt: {
      zh: "创作一张手绘风格的信息图卡片，比例为9:16竖版。卡片主题鲜明，背景为带有纸质肌理的米色或米白色，整体设计体现质朴、亲切的手绘美感。\n\n卡片上方以红黑相间、对比鲜明的大号毛笔草书字体突出标题，吸引视觉焦点。文字内容均采用中文草书，整体布局分为2至4个清晰的小节，每节以简短、精炼的中文短语表达核心要点。字体保持草书流畅的韵律感，既清晰可读又富有艺术气息。\n\n卡片中点缀简单、有趣的手绘插画或图标，例如人物或象征符号，以增强视觉吸引力，引发读者思考与共鸣。\n整体布局注意视觉平衡，预留足够的空白空间，确保画面简洁明了，易于阅读和理解。\n\n<h1><span style=\"color:red\">「认知」</span>决定上限\n<span style=\"color:red\">「圈子」</span>决定机会</h1>\n- 你赚不到「认知」以外的钱，\n- 也遇不到「圈子」以外的机会。",
      en: "Create a hand-drawn style infographic card, aspect ratio 9:16 portrait. The card has a clear theme, with a beige or off-white background featuring paper texture, embodying a rustic, approachable hand-drawn aesthetic.\n\nAt the top, use large, contrasting red and black brush calligraphy (cursive) font for the title to capture visual focus. All text content uses Chinese cursive script, laid out in 2 to 4 clear sections, each expressing key points with short, concise Chinese phrases. The font maintains the flowing rhythm of cursive script, being both legible and artistic.\n\nDot the card with simple, interesting hand-drawn illustrations or icons, such as figures or symbols, to enhance visual appeal and evoke reader thought and resonance.\nPay attention to visual balance in the overall layout, leaving enough white space to ensure the image is concise, clear, easy to read and understand.\n\n<h1><span style=\"color:red\">\"Cognition\"</span> determines the upper limit\n<span style=\"color:red\">\"Circle\"</span> determines opportunities</h1>\n- You can't earn money beyond your \"cognition\",\n- Nor can you encounter opportunities outside your \"circle\"."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["信息图", "手绘", "卡片", "文字"],
      en: ["Infographic", "Hand-drawn", "Card", "Text"]
    }
  },
  {
    id: "35",
    title: {
      zh: "毛茸茸南瓜灯",
      en: "Fluffy Jack-o'-lantern"
    },
    author: {
      name: "gizakdag",
      twitter: "https://x.com/gizakdag" // Correct URL format
    },
    originalLink: "https://x.com/gizakdag/status/1911075302941622512", // Correct URL format
    image: "/examples/example_fluffy_pumpkin.jpeg",
    prompt: {
       // Using English prompt directly as it defines the transformation
      zh: "将一个简单的扁平矢量图标[🎃]转变为柔软的 3D 毛茸茸物体。形状完全覆盖着毛皮，具有超逼真的毛发纹理和柔和的阴影。物体位于干净、浅灰色背景的中心，轻轻漂浮在空中。风格超现实、触感强、现代，唤起舒适和俏皮感。工作室灯光，高分辨率渲染。", // Translated from English
      en: "Transform a simple flat vector icon of [🎃] into a soft, 3D fluffy object. The shape is fully covered in fur, with hyperrealistic hair texture and soft shadows. The object is centered on a clean, light gray background and floats gently in space. The style is surreal, tactile, and modern, evoking a sense of comfort and playfulness. Studio lighting, high-resolution render."
    },
    requiresReferenceImage: false, // Icon provided in prompt
    tags: {
      zh: ["毛茸茸", "3D", "图标转换", "南瓜灯", "超现实"],
      en: ["Fluffy", "3D", "Icon Transformation", "Jack-o'-lantern", "Surreal"]
    }
  },
   {
    id: "36",
    title: {
      zh: "极简主义 3D 插画 (文字版)",
      en: "Minimalist 3D Illustration (Text Version)"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1907131027253772399", // Correct URL format
    image: "/examples/example_minimalist_3d_toilet_txt.jpeg",
    prompt: {
      // Prompt is descriptive text, translating for zh
      zh: "画一个马桶：\n\n## 艺术风格简介：极简主义3D插画（Minimalist 3D Illustration）\n\n### 🎨 视觉元素（Visual Elements）\n\n#### 🟢 造型语言（Shape Language）\n- 圆润的边缘、平滑柔和的外形，采用简化几何造型。\n\n#### 🎨 色彩（Colors）\n- **主色调：** 柔和米色、浅灰色、暖橙色。\n- **强调色：** 暖橙色用于焦点元素。\n- **明暗处理：** 柔和渐变，平滑过渡，避免强烈的阴影和高光。\n\n#### 💡 光照（Lighting）\n- **类型：** 柔和、漫反射光照。\n- **光源方向：** 上方稍偏右。\n- **阴影风格：** 微妙且漫射，无锐利或高对比度的阴影。\n\n#### 🧱 材质（Materials）\n- **表面纹理：** 哑光、平滑的表面，带有微妙的明暗变化。\n- **反射性：** 低或无，避免明显的光泽。\n\n#### 🖼️ 构图（Composition）\n- **对象呈现：** 单一、居中的物体，周围留出大量负空间。\n- **视角：** 轻微倾斜视角，呈现适度的三维感，但无明显的景深效果。\n- **背景：** 纯色、低饱和度，与主体协调且不干扰视线。\n\n#### ✒️ 字体排版（Typography）\n- **字体风格：** 极简、无衬线字体。\n- **文字位置：** 左下角，尺寸小巧且不突出。\n- **字体颜色：** 灰色，与背景形成低对比度。\n\n#### 🖥️ 渲染风格（Rendering Style）\n- **技术手法：** 3D渲染，采用简化的低多边形风格。\n- **细节程度：** 中等细节，以形状和色彩为主，避免复杂纹理和细节。\n\n### 🎯 风格目标（Purpose）\n> 创建干净、美观的视觉效果，强调简洁、亲和和现代感。",
      en: "Draw a toilet:\n\n## Art Style Profile: Minimalist 3D Illustration\n\n### 🎨 Visual Elements\n\n#### 🟢 Shape Language\n- Rounded edges, smooth and soft forms, using simplified geometry.\n\n#### 🎨 Colors\n- **Primary Palette:** Soft beige, light gray, warm orange.\n- **Accent Colors:** Warm orange for focal elements.\n- **Shading:** Soft gradients, smooth transitions, avoiding harsh shadows and highlights.\n\n#### 💡 Lighting\n- **Type:** Soft, diffused lighting.\n- **Source Direction:** Above and slightly to the right.\n- **Shadow Style:** Subtle and diffused, no sharp or high-contrast shadows.\n\n#### 🧱 Materials\n- **Surface Texture:** Matte, smooth surfaces with subtle shading.\n- **Reflectivity:** Low or none, avoiding noticeable gloss.\n\n#### 🖼️ Composition\n- **Object Presentation:** Single, central object with ample negative space around it.\n- **Perspective:** Slightly angled view, providing a moderate sense of three-dimensionality without significant depth of field.\n- **Background:** Solid, low-saturation color that complements the subject without distraction.\n\n#### ✒️ Typography\n- **Font Style:** Minimalist, sans-serif font.\n- **Text Placement:** Bottom-left corner, small and unobtrusive size.\n- **Font Color:** Gray, low contrast against the background.\n\n#### 🖥️ Rendering Style\n- **Technique:** 3D rendering, using a simplified low-poly style.\n- **Detail Level:** Medium detail, focusing on shape and color, avoiding complex textures and details.\n\n### 🎯 Purpose\n> To create clean, aesthetically pleasing visuals that emphasize simplicity, approachability, and modernity."
    },
    requiresReferenceImage: false, // Object is defined by text description
    tags: {
      zh: ["3D", "极简主义", "插画", "文字描述"],
      en: ["3D", "Minimalist", "Illustration", "Text Description"]
    }
  },
   {
    id: "37",
    title: {
      zh: "社交媒体帖子涂鸦",
      en: "Social Media Post Doodle"
    },
    author: {
      name: "op7418",
      twitter: "https://x.com/op7418" // Correct URL format
    },
    originalLink: "https://x.com/op7418/status/1906208691877253536", // Correct URL format
    image: "/examples/example_social_media_doodle.jpeg",
    prompt: {
      zh: "生成图片，把它打印出来，然后用红墨水疯狂地加上手写中文批注、涂鸦、乱画，如果你想的话，还可以加点小剪贴画",
      en: "Generate an image, print it out, then frantically add handwritten Chinese annotations, doodles, scribbles with red ink, and if you want, add some small clip art."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["涂鸦", "手写", "批注", "社交媒体"],
      en: ["Doodle", "Handwritten", "Annotation", "Social Media"]
    }
  },
  {
    id: "38",
    title: {
      zh: "手绘信息图卡片", // Same title as 34, keeping it
      en: "Hand-drawn Infographic Card"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1907870919852179850", // Correct URL format
    image: "/examples/example_hand_drawn_infographic.jpeg",
    prompt: {
      zh: "创作一张手绘风格的信息图卡片，比例为9:16竖版。卡片主题鲜明，背景为带有纸质肌理的米色或米白色，整体设计体现质朴、亲切的手绘美感。\n\n卡片上方以红黑相间、对比鲜明的大号毛笔草书字体突出标题，吸引视觉焦点。文字内容均采用中文草书，整体布局分为2至4个清晰的小节，每节以简短、精炼的中文短语表达核心要点。字体保持草书流畅的韵律感，既清晰可读又富有艺术气息。周边适当留白。\n\n卡片中点缀简单、有趣的手绘插画或图标，例如人物或象征符号，以增强视觉吸引力，引发读者思考与共鸣。整体布局注意视觉平衡，预留足够的空白空间，确保画面简洁明了，易于阅读和理解。\n\"做 IP 是长期复利\n坚持每日更新，肯定会有结果，因为 99% 都坚持不了的！\"",
      en: "Create a hand-drawn style infographic card, aspect ratio 9:16 portrait. The card has a clear theme, with a beige or off-white background featuring paper texture, embodying a rustic, approachable hand-drawn aesthetic.\n\nAt the top, use large, contrasting red and black brush calligraphy (cursive) font for the title to capture visual focus. All text content uses Chinese cursive script, laid out in 2 to 4 clear sections, each expressing key points with short, concise Chinese phrases. The font maintains the flowing rhythm of cursive script, being both legible and artistic. Leave appropriate whitespace around the edges.\n\nDot the card with simple, interesting hand-drawn illustrations or icons, such as figures or symbols, to enhance visual appeal and evoke reader thought and resonance. Pay attention to visual balance in the overall layout, leaving enough white space to ensure the image is concise, clear, easy to read and understand.\n\"Building an IP is long-term compound interest\nPersist in daily updates, results will definitely come, because 99% can't stick to it!\""
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["信息图", "手绘", "卡片", "IP"],
      en: ["Infographic", "Hand-drawn", "Card", "IP"]
    }
  },
  {
    id: "39",
    title: {
      zh: "卡通插画",
      en: "Cartoon Illustration"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1905103477879267823", // Correct URL format
    image: "/examples/example_fantasy_computer_head_portal.jpeg",
    prompt: {
        // Using English prompt directly
      zh: "一个卡通风格的角色，头部是一个微笑的电脑显示器，戴着手套和靴子，高兴地跳过一个发光的蓝色圆形传送门，背景是一个茂密的奇幻森林景观。森林细节丰富，有大树、蘑菇、花朵、宁静的河流、漂浮的岛屿和带有多个月亮的氛围星空。明亮、鲜艳的色彩搭配柔和的光照，奇幻插画风格。", // Translated from English
      en: "A cartoon-style character with a smiling computer monitor as its head, wearing gloves and boots, happily jumping through a glowing, blue, circular portal in a lush, fantasy forest landscape. The forest is detailed with large trees, mushrooms, flowers, a serene river, floating islands, and an atmospheric starry night sky with multiple moons. Bright, vibrant colors with soft lighting, fantasy illustration style."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["卡通", "插画", "奇幻", "电脑"],
      en: ["Cartoon", "Illustration", "Fantasy", "Computer"]
    }
  },
  {
    id: "40",
    title: {
      zh: "日系双格漫画 (少女总统红温了)",
      en: "Japanese-style Two-Panel Manga (Girl President Got Angry)"
    },
    author: {
      name: "hellokaton",
      twitter: "https://x.com/hellokaton" // Correct URL format
    },
    originalLink: "https://x.com/hellokaton/status/1910900979194646959", // Correct URL format
    image: "/examples/example_two_panel_manga_president.jpeg",
    prompt: {
      zh: "创建一张日系萌系双格漫画，上下排列，主题：少女总统的工作日常。\n\n角色形象: 将上传的附件转换为日系萌系卡通女生形象的风格，保留原图所有细节，如服饰（西装）、发型（明亮的金黄色）、五官等。 \n\n第一格: \n- 表情: 委屈巴巴，沮丧的表情，单手托腮 \n- 文字框: \"肿么办嘛！他不跟我通话！(；´д｀)\" \n- 场景: 暖色调办公室，背后美国国旗，桌上放着一堆汉堡，一个复古红色转盘电话，人物在画面左边，电话在右边。  \n\n第二格:  \n- 表情: 咬牙切齿，暴怒，脸涨红 \n- 动作: 猛拍桌子，汉堡震得跳起来 \n- 文字泡: \"哼！关税加倍！不理我是他们的损失！(`д´ )\" - 场景: 和第一格相同，但一片狼藉。  \n\n其他说明:  \n- 文字采用简洁可爱的手写体，整体风格可爱而有趣。 \n- 构图饱满生动，请保留足够空间用于文字显示，适当留白。 \n- 图片比例 2:3。 \n- 画面整体色彩鲜艳，突出卡通风格。",
      en: "Create a Japanese moe-style two-panel manga, arranged vertically. Theme: A day in the life of a girl president.\n\nCharacter Image: Convert the uploaded attachment into a Japanese moe-style cartoon girl image, retaining all details from the original image, such as attire (suit), hairstyle (bright golden yellow), facial features, etc.\n\nFirst Panel:\n- Expression: Pouting,沮丧 (frustrated), resting cheek on one hand.\n- Text Box: \"What should I do! He won't talk to me! (；´д｀)\"\n- Scene: Warm-toned office, American flag in the background, a pile of hamburgers on the desk, a retro red rotary phone. Character on the left, phone on the right.\n\nSecond Panel:\n- Expression: Gritting teeth, furious, face flushed red.\n- Action: Slamming the table, hamburgers jumping from the impact.\n- Speech Bubble: \"Hmph! Double the tariffs! It's their loss for ignoring me! (`д´ )\"\n- Scene: Same as the first panel, but in disarray.\n\nOther Notes:\n- Use simple, cute handwritten font for text. Overall style is cute and fun.\n- Composition should be full and lively, leave enough space for text display, with appropriate whitespace.\n- Image aspect ratio 2:3.\n- Overall colors should be vibrant, emphasizing the cartoon style."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["漫画", "日系", "萌系", "双格"],
      en: ["Manga", "Japanese Style", "Moe", "Two-panel"]
    }
  },
  {
    id: "41",
    title: {
      zh: "微型立体场景 (孙悟空三打白骨精)",
      en: "Miniature Diorama (Sun Wukong Thrice Beats the White Bone Spirit)"
    },
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey" // Correct URL format
    },
    originalLink: "https://x.com/dotey/status/1911609122547449886", // Correct URL format
    image: "/examples/example_miniature_journey_west.jpeg",
    prompt: {
      zh: "微型立体场景呈现，运用移轴摄影的技法，呈现出Q版【孙悟空三打白骨精】场景",
      en: "Present a miniature diorama scene, using tilt-shift photography techniques, depicting a Q-version scene of [Sun Wukong Thrice Beats the White Bone Spirit]."
    },
    requiresReferenceImage: false,
    tags: {
      zh: ["微缩", "立体场景", "移轴摄影", "西游记", "Q版"],
      en: ["Miniature", "Diorama", "Tilt-shift", "Journey to the West", "Chibi"]
    }
  },
    {
    id: "42",
    title: {
      zh: "3D Q版情侣水晶球",
      en: "3D Q-version Couple Snow Globe"
    },
    author: {
      name: "balconychy",
      twitter: "https://x.com/balconychy" // Correct URL format
    },
    originalLink: "https://x.com/balconychy/status/1909908568129655248", // Correct URL format
    image: "/examples/example_3d_q_snowglobe_couple.jpeg",
    prompt: {
      zh: "将附图中的人物转换成水晶球场景。 整体环境：水晶球放在窗户旁桌面上，背景模糊，暖色调。阳光透过球体，洒下点点金光，照亮了周围的黑暗。 水晶球内部：人物是可爱Q版3D造型，相互之间满眼的爱意。",
      en: "Transform the people in the attached picture into a snow globe scene. Overall environment: The snow globe is placed on a tabletop next to a window, background blurred, warm color tone. Sunlight shines through the globe, casting specks of golden light, illuminating the surrounding darkness. Inside the snow globe: The characters are cute Q-version 3D models, looking at each other with eyes full of love."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["水晶球", "Q版", "3D", "情侣"],
      en: ["Snow Globe", "Chibi", "3D", "Couple"]
    }
  },
  {
    id: "43",
    title: {
      zh: "Q版可爱俄罗斯套娃 (戴珍珠耳环的少女)",
      en: "Q-version Cute Matryoshka Doll (Girl with a Pearl Earring)"
    },
    author: {
      name: "ZHO_ZHO_ZHO",
      twitter: "https://x.com/ZHO_ZHO_ZHO" // Correct URL format
    },
    originalLink: "https://x.com/ZHO_ZHO_ZHO/status/1911669883315818497", // Correct URL format
    image: "/examples/example_matryoshka_pearl_earring.png",
    prompt: {
      zh: "把图片人物生成变成 Q 版可爱俄罗斯套娃🪆，大到小一共五个，放在精致的木桌上，横幅4:3比例",
      en: "Transform the person in the picture into a Q-version cute Matryoshka doll 🪆 set, five dolls from largest to smallest, placed on an exquisite wooden table, landscape 4:3 aspect ratio."
    },
    requiresReferenceImage: true,
    tags: {
      zh: ["俄罗斯套娃", "Q版", "可爱", "名画"],
      en: ["Matryoshka Doll", "Chibi", "Cute", "Masterpiece"]
    }
  }
];



export const authors = [
  { name: 'balconychy', count: 7, twitter: 'https://x.com/balconychy' },
  { name: 'dotey', count: 15, twitter: 'https://x.com/dotey' },
  { name: 'AnimeAI', count: 2, twitter: 'https://animeai.online'  },
  { name: 'ZHO_ZHO_ZHO', count: 9, twitter: 'https://x.com/ZHO_ZHO_ZHO' },
  { name: '0xdlk', count: 1, twitter: 'https://x.com/0xdlk' },
  { name: 'richardchang', count: 1, twitter: 'https://x.com/richardchang' },
  { name: 'gizakdag', count: 1, twitter: 'https://x.com/gizakdag' },
  { name: 'op7418', count: 1, twitter: 'https://x.com/op7418' },
  { name: 'hellokaton', count: 1, twitter: 'https://x.com/hellokaton' }
]; 