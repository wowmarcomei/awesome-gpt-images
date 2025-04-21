# Awesome GPT Images Prompt List Online ✨

一个精心收集的 GPT-4 Vision 图像创作案例展示网站，旨在为创作者提供灵感和参考。这是 [jamez-bondos/awesome-gpt4o-images](https://github.com/jamez-bondos/awesome-gpt4o-images) 项目的 Web 版本，提供了更好的浏览和交互体验。

![demo](https://raw.githubusercontent.com/wowmarcomei/awesome-gpt-images/main/media/home-demo.png)

[![English](https://img.shields.io/badge/English-View-blue)](README_EN.md)
[![Online Preview](https://img.shields.io/badge/预览-awesome--gpt--images-green)](https://prompt.laomeinote.com)

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwowmarcomei%2Fawesome-gpt-images)
[![Deploy with Cloudflare Pages](https://img.shields.io/badge/Deploy%20with%20Cloudflare%20Pages-000000?style=for-the-badge&logo=Cloudflare&logoColor=white)](https://pages.cloudflare.com/)

## 🌟 特色功能

- 📸 精选案例展示
  - 高质量的 GPT-4 Vision 创作案例
  - 包含详细的提示词说明
  - 支持查看原始创作链接

- 🔍 强大的筛选功能
  - 标签分类筛选
  - 作者筛选
  - 关键词搜索

- 💡 便捷的提示词管理
  - 代码框式提示词展示
  - 一键复制功能
  - 优雅的复制成功提示

- 🎨 精美的用户界面
  - 响应式卡片布局
  - 深色模式支持
  - 流畅的动画效果

- 👥 用户系统
  - 多用户登录支持
  - 永久收藏保留
  - 点赞和收藏同步

- 🌐 多语言支持
  - 中英文切换
  - 完整的国际化体验

## 🔨️ 技术栈

- **前端框架**: Next.js
- **样式方案**: Tailwind CSS
- **动画效果**: Framer Motion
- **图标**: React Icons
- **图片优化**: Next.js Image
- **类型检查**: TypeScript
- **认证鉴权**: Supabase Auth
- **数据存储**: Supabase PostgreSQL

## 🚀 本地开发

1. 克隆项目
```bash
git clone https://github.com/wowmarcomei/awesome-gpt4o-images-prompt-online.git
cd awesome-gpt-images
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 📦 部署

### Supabase 设置

1. 创建 Supabase 项目
   - 注册并登录 [Supabase](https://supabase.com/)
   - 创建新项目，记录项目 URL 和 API 密钥

2. 初始化数据库
   - 在 Supabase 控制台中，进入 SQL 编辑器
   - 将 `supabase/init.sql` 文件中的内容复制并执行，创建必要的表和视图
   - 这将创建以下内容：
     - `users_view`：用户信息视图
     - `collections`：收藏和点赞表
     - `user_settings`：用户设置表
     - 必要的索引和安全策略

3. 配置认证设置
   - 在 Supabase 控制台中，进入“认证”页面
   - 启用邮箱密码登录，并配置邮件模板
   - 在“第三方登录”选项卡中，根据需要启用：
     - Google
     - GitHub
     - Twitter
     - Apple
     - Facebook
   - 在“URL 配置”中，设置以下内容：
     - 站点 URL：你的应用 URL（例如 `https://your-app.vercel.app`）
     - 重定向 URL：添加 `https://your-app.vercel.app/auth/callback`

### Vercel 部署

1. 一键部署
   - 点击上方的 "Deploy with Vercel" 按钮
   - 按照 Vercel 的提示完成部署

2. 手动部署
   ```bash
   # 安装 Vercel CLI
   npm i -g vercel
   
   # 登录 Vercel
   vercel login
   
   # 部署项目
   vercel
   ```

3. 通过 GitHub 部署
   - Fork 本项目
   - 在 Vercel 中导入你的 GitHub 仓库
   - Vercel 会自动完成部署并在代码更新时自动重新部署

4. 环境变量设置
   - 在 Vercel 项目设置中，添加以下环境变量：
     - `NEXT_PUBLIC_SUPABASE_URL`：Supabase 项目 URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`：Supabase 匿名密钥
     - `NEXT_PUBLIC_APP_URL`：你的应用 URL（例如 `https://your-app.vercel.app`）
     - `DATABASE_URL`：Supabase PostgreSQL 连接字符串
     - `RESEND_API_KEY`: RECEND API 密钥

### Cloudflare Pages 部署

1. 环境准备
   - 复制 `.env.example` 文件并重命名为 `.env`
   - 填写必要的环境变量（Supabase 配置等）
2. 部署步骤
   - 登录到 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 Pages 页面，点击“创建应用”
   - 选择“连接到 Git”，然后选择你的 GitHub 仓库
   - 配置构建设置：
     - 构建命令：`npx @cloudflare/next-on-pages@1`
     - 构建输出目录：`.vercel/output/static`
     - 根目录：`/`
     - 运行时兼容性标志： `nodejs_compat`
3. 环境变量设置
   - 在部署设置中，添加以下环境变量：
     - `NEXT_PUBLIC_SUPABASE_URL`：Supabase 项目 URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`：Supabase 匿名密钥
     - `NEXT_PUBLIC_APP_URL`：你的应用 URL（例如 `https://your-app.pages.dev`）
     - `DATABASE_URL`：Supabase PostgreSQL 连接字符串
     - `RESEND_API_KEY`: RECEND_API 密钥
4. 安全性设置
   - 在 Cloudflare Pages 设置中，启用“边缘运行时”以支持 Edge API 路由

## 🌐 在线预览

访问 [https://prompt.laomeinote.com](https://prompt.laomeinote.com/) 查看在线演示。

## 🤝 贡献指南

欢迎提交新的案例！请确保您的提交包含：

- 高质量的创作成果
- 完整的提示词
- 作者信息
- 原始链接
- 适当的标签分类

## 📋 开发计划

### 第一阶段（已完成）
- [x] 基础卡片布局
- [x] 搜索功能
- [x] 暗色模式
- [x] 响应式设计

### 第二阶段（进行中）
- [x] 分页功能
- [x] 高级筛选
- [x] 图片优化
- [x] 支持多语言
- [x] 用户认证
- [x] 收藏、点赞系统

### 第三阶段（计划中）
- [ ] 案例提交表单
- [ ] 案例详情页
- [ ] 社交分享

---

如果这个项目对您有帮助，请考虑给它一个 ⭐️ 



## 📝 许可证

MIT License

## 💖 致谢

- 感谢 [jamez-bondos/awesome-gpt4o-images](https://github.com/jamez-bondos/awesome-gpt4o-images) 项目提供灵感
- 感谢所有创作者的精彩分享和贡献