#!/bin/bash

echo "🔄 部署任务控制中心..."

# 1. 安装依赖
echo "📦 安装依赖..."
npm install

# 2. 构建Next.js应用
echo "🏗️ 构建应用..."
npm run build

# 3. 部署到Convex
echo "🚀 部署到Convex..."
npx convex dev --once

echo "✅ 任务控制中心部署完成！"
echo "📋 访问地址将在Convex控制台中显示"