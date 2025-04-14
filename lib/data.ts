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
  }
  // ... 其他案例数据
]; 