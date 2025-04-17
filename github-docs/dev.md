# 用户中心开发计划与解决方案

## 1. 项目结构

### 页面结构
```
/app/dashboard/
  ├── page.tsx          # 用户中心主页
  ├── layout.tsx        # 用户中心布局（包含左侧栏）
  ├── loading.tsx       # 加载状态
  └── components/       # 用户中心专用组件
      ├── Sidebar.tsx   # 左侧导航栏
      ├── UserNav.tsx   # 用户导航（下拉菜单）
      └── CaseGrid.tsx  # 卡片网格组件
```

## 2. 数据模型

### Prisma 配置
1. 安装依赖
```bash
npm install prisma @prisma/client
npm install @supabase/supabase-js
```

2. 初始化 Prisma
```bash
npx prisma init
```

3. Prisma Schema 设计
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 用户表（映射到 auth.users）
model User {
  id            String       @id @default(uuid())
  email         String       @unique
  collections   Collection[]
  settings      UserSettings?
  createdAt     DateTime     @default(now()) @map("created_at")
  updatedAt     DateTime     @updatedAt @map("updated_at")

  @@map("users")
  @@schema("auth")
}

// 收藏表
model Collection {
  id            String       @id @default(uuid())
  userId        String       @map("user_id")
  caseId        String       @map("case_id")
  type          CollectionType
  createdAt     DateTime     @default(now()) @map("created_at")
  user          User         @relation(fields: [userId], references: [id])

  @@map("collections")
  @@schema("public")
}

// 用户设置表
model UserSettings {
  id                  String    @id @default(uuid())
  userId              String    @unique @map("user_id")
  themePreference    String?   @map("theme_preference")
  languagePreference String?   @map("language_preference")
  notificationSettings Json?    @map("notification_settings")
  user                User      @relation(fields: [userId], references: [id])

  @@map("user_settings")
  @@schema("public")
}

enum CollectionType {
  FAVORITE
  BOOKMARK
}
```

4. 环境变量配置
```env
# .env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

5. 数据库迁移命令
```bash
# 生成迁移文件
npx prisma migrate dev --name init

# 应用迁移到数据库
npx prisma migrate deploy
```

### 数据库访问层设计
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### API 实现示例
```typescript
// app/api/collections/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  
  try {
    const collections = await prisma.collection.findMany({
      where: { userId },
      include: { user: true }
    })
    return NextResponse.json(collections)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { userId, caseId, type } = await req.json()
    const collection = await prisma.collection.create({
      data: { userId, caseId, type }
    })
    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}
```

## 3. 功能模块

### 导航与路由
- 用户头像下拉菜单
  - [ ] 用户中心入口
  - [ ] 退出登录选项
- 路由配置
  - [ ] `/dashboard` - 主页
  - [ ] `/dashboard/favorites` - 收藏
  - [ ] `/dashboard/bookmarks` - 书签

### 左侧栏功能
- [ ] 我的收藏
- [ ] 我的喜欢
- [ ] 退出登录（底部固定）
- [ ] 响应式设计（移动端可收起）

### 用户交互
- 卡片操作
  - [ ] 收藏/取消收藏
  - [ ] 点赞/取消点赞
- [ ] 实时状态更新
- [ ] 加载状态处理
- [ ] 错误状态处理

## 4. API 设计

### 接口路由
```typescript
// 收藏相关接口
GET    /api/collections            // 获取用户收藏列表
POST   /api/collections            // 添加收藏
DELETE /api/collections/:id        // 删除收藏
GET    /api/collections/stats      // 获取收藏统计
```

## 5. 状态管理

### 技术选型
- [ ] React Context 用户收藏状态管理
- [ ] 实现乐观更新
- [ ] SWR/React Query 数据缓存

## 6. 安全措施

### 安全控制
- [ ] API 路由认证
- [ ] Rate Limiting 实现
- [ ] 数据库权限控制
- [ ] XSS/CSRF 防护

## 7. 性能优化

### 优化措施
- [ ] 分页加载实现
- [ ] 图片懒加载
- [ ] 状态缓存优化
- [ ] 路由预加载

## 8. UI 设计

### 布局结构
```
+------------------+---------------------------+
|    Logo/Brand    |         Header           |
+------------------+---------------------------+
|                  |                          |
|   Dashboard      |                          |
|   My Favorites   |      Content Area        |
|   My Bookmarks   |     (Card Grid with      |
|                  |     Infinite Scroll)      |
|                  |                          |
|                  |                          |
|                  |                          |
|                  |                          |
|   [Logout]       |                          |
|                  |                          |
+------------------+---------------------------+
```

## 9. 实现步骤

### 阶段一：基础架构
1. [ ] 创建必要的页面和路由
2. [ ] 设置数据库表和关系
3. [ ] 实现基础 API 端点

### 阶段二：UI 实现
4. [ ] 创建用户界面组件
5. [ ] 实现左侧栏
6. [ ] 实现用户导航

### 阶段三：功能实现
7. [ ] 实现数据获取和状态管理
8. [ ] 添加收藏和点赞功能
9. [ ] 实现实时更新

### 阶段四：优化
10. [ ] 性能优化
11. [ ] 用户体验改进
12. [ ] 测试和调试

## 10. 注意事项

### 开发要点
1. 确保与现有的认证系统无缝集成
2. 保持与现有UI风格的一致性
3. 确保良好的移动端适配
4. 实现渐进式加载以提升性能

### 潜在问题
1. 数据同步和并发处理
2. 移动端响应式设计
3. 性能优化
4. 错误处理和恢复

## 11. 更新日志

### [2024-xx-xx] 数据库设计更新
- 添加 Prisma 配置和实现方案
- 设计数据库模型
- 添加数据库访问层示例代码
- 添加 API 实现示例

---

*注：本文档将随开发进度持续更新*
