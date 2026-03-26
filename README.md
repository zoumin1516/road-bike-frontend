# Road Bike Frontend

公路车数据库前端项目，基于 Next.js App Router 构建，提供品牌、车型、配置、零部件等资源的列表、详情、搜索和筛选体验。

## 功能概览

- 首页与全站导航
- 品牌库：列表页 + 详情页
- 车型库：列表页 + 详情页
- 配置库：列表页 + 详情页
- 零部件库：列表页 + 详情页
- 全站搜索页
- 统一的面包屑、分页、筛选侧栏、上下文跳转组件

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript 5
- Tailwind CSS 4

## 目录结构（核心）

```text
src/
  app/                  # 路由页面（品牌/车型/配置/零部件/搜索/关于）
  components/           # 复用 UI 组件与页面结构组件
  lib/
    api/                # API 调用封装
    constants/          # 站点常量（含 API Base URL 兜底）
  types/                # 业务类型定义
```

## 环境变量

复制示例文件并按需修改：

```bash
cp .env.local.example .env.local
```

当前关键变量：

- `NEXT_PUBLIC_API_BASE_URL`

说明：

- 前端优先读取 `process.env.NEXT_PUBLIC_API_BASE_URL`
- 未设置时会回退到 `src/lib/constants/site.ts` 中的默认值

## 本地开发

```bash
npm ci
npm run dev
```

访问：

- 前端首页：`http://127.0.0.1:3000`

## 生产构建与运行

```bash
npm run build
npm run start
```

## Docker（仅前端）

在当前目录构建并运行：

```bash
docker build -t road-bike-frontend:latest .
docker run -d --name road-bike-frontend -p 3000:3000 road-bike-frontend:latest
```

访问：

- `http://127.0.0.1:3000`

## Docker Compose（推荐联调）

项目根目录提供了编排文件：

- `/Users/jyxc-dz-0100528/Project/docker-compose.yml`

用于一键启动 `mysql + backend + frontend`。

```bash
cd /Users/jyxc-dz-0100528/Project
docker compose up -d --build
```

更多容器运行细节参考：

- `docker-run-guide.md`

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run lint
```