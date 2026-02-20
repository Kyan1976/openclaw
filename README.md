# AI任务控制中心

基于Next.js + Convex的实时任务管理系统，用于跟踪李小明AI团队的所有任务。

## 功能特性
- 📋 共享任务板（用户和AI团队共享）
- 🔄 实时任务状态更新
- 👥 AI团队成员任务分配
- 📊 任务进度可视化
- 📝 任务历史记录

## 技术栈
- Next.js 14 (App Router)
- Convex (实时数据库)
- Tailwind CSS (UI)
- TypeScript (类型安全)

## 目录结构
```
task-control-center/
├── convex/              # Convex后端逻辑
│   ├── schema.ts        # 数据库schema
│   ├── tasks.ts         # 任务相关函数
│   └── auth.ts          # 认证逻辑
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── page.tsx     # 主任务板页面
│   │   ├── layout.tsx   # 布局
│   │   └── api/         # API路由
│   └── components/      # React组件
│       ├── TaskCard.tsx
│       ├── TaskBoard.tsx
│       └── TeamMember.tsx
├── public/              # 静态资源
└── package.json         # 依赖配置
```