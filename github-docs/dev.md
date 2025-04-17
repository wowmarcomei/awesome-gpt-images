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

### 数据库设计

#### 表结构
1. `users_view`（视图）
   - 字段：
     - `id`: 用户唯一标识
     - `email`: 邮箱地址
     - `provider`: 认证提供商（google/github/email等）
   - 来源：`auth.users` 表

2. `collections`（收藏和点赞表）
   - 主键：`id` (UUID)
   - 外键：`user_id` -> `users_view.id`
   - 字段：
     - `case_id`: 案例ID
     - `type`: 类型（LIKE/FAVORITE）
     - `created_at`: 创建时间
   - 约束：
     - 用户不能对同一案例重复点赞或收藏
     - 级联删除（当用户被删除时）

3. `user_settings`（用户设置表）
   - 主键：`id` (UUID)
   - 外键：`user_id` -> `users_view.id`
   - 字段：
     - `theme_preference`: 主题偏好
     - `language_preference`: 语言偏好
     - `notification_settings`: 通知设置（JSONB）
   - 约束：
     - 每个用户只能有一条设置记录
     - 级联删除（当用户被删除时）

### 数据库初始化
1. 登录 Supabase Dashboard
2. 进入 SQL Editor
3. 复制 `supabase/init.sql` 中的内容并执行
   - 创建必要的视图、表和类型
   - 设置约束和索引
   - 配置行级安全策略（RLS）

如需重置数据库，可以执行 `init.sql` 文件底部注释中的清理命令。

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

### 阶段一：数据库设计与迁移
1. [x] 创建数据库模型
2. [x] 创建必要的视图和表
3. [ ] 验证数据库连接和查询

### 阶段二：UI 实现
5. [ ] 创建用户界面组件
6. [ ] 实现左侧栏
7. [ ] 实现用户导航

### 阶段三：功能实现
8. [ ] 实现数据获取和状态管理
9. [ ] 添加收藏和点赞功能
10. [ ] 实现实时更新

### 阶段四：优化
11. [ ] 性能优化
12. [ ] 用户体验改进
13. [ ] 测试和调试

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
- [x] 设计数据库模型
- [x] 创建 Prisma schema
- [x] 准备数据库迁移
- [ ] 执行数据库迁移

---

*注：本文档将随开发进度持续更新*
