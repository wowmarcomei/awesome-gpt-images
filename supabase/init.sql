-- 1. 创建用户视图
CREATE OR REPLACE VIEW public.users_view AS 
SELECT 
    id, 
    email,
    raw_app_meta_data->>'provider' as provider  -- 添加 provider 字段，可能的值：google、github、email 等
FROM auth.users;

-- 2. 创建收藏类型枚举
CREATE TYPE "CollectionType" AS ENUM ('LIKE', 'FAVORITE');

-- 3. 创建收藏表
CREATE TABLE "collections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "case_id" TEXT NOT NULL,
    "type" "CollectionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "collections_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. 创建用户设置表
CREATE TABLE "user_settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "theme_preference" TEXT,
    "language_preference" TEXT,
    "notification_settings" JSONB,
    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. 添加唯一约束和索引
-- 用户设置表的用户ID唯一约束
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_key" UNIQUE ("user_id");

-- 收藏表的复合唯一索引（防止重复收藏/点赞）
CREATE UNIQUE INDEX "collections_user_id_case_id_type_key" ON "collections"("user_id", "case_id", "type");

-- 收藏表的查询优化索引
CREATE INDEX "collections_user_id_type_idx" ON "collections"("user_id", "type");

-- 6. 启用行级安全策略（RLS）
ALTER TABLE "collections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_settings" ENABLE ROW LEVEL SECURITY;

-- 7. 创建访问策略
-- 收藏表的访问策略
CREATE POLICY "用户可以查看自己的收藏" ON "collections"
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以创建自己的收藏" ON "collections"
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以删除自己的收藏" ON "collections"
FOR DELETE USING (auth.uid() = user_id);

-- 用户设置表的访问策略
CREATE POLICY "用户可以查看自己的设置" ON "user_settings"
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以创建自己的设置" ON "user_settings"
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以更新自己的设置" ON "user_settings"
FOR UPDATE USING (auth.uid() = user_id);

-- 如果需要清理所有表和类型，可以执行以下命令：
/*
DROP TABLE IF EXISTS "collections" CASCADE;
DROP TABLE IF EXISTS "user_settings" CASCADE;
DROP TYPE IF EXISTS "CollectionType" CASCADE;
DROP VIEW IF EXISTS "users_view" CASCADE;

-- 清理策略
DROP POLICY IF EXISTS "用户可以查看自己的收藏" ON "collections";
DROP POLICY IF EXISTS "用户可以创建自己的收藏" ON "collections";
DROP POLICY IF EXISTS "用户可以删除自己的收藏" ON "collections";
DROP POLICY IF EXISTS "用户可以查看自己的设置" ON "user_settings";
DROP POLICY IF EXISTS "用户可以创建自己的设置" ON "user_settings";
DROP POLICY IF EXISTS "用户可以更新自己的设置" ON "user_settings";
*/ 