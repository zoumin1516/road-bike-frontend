# 公路车资料查询网站前端架构与技术选型文档

## 1. 文档目标

本文档用于明确公路车资料查询网站在前后端分离架构下的前端实现方案，主要回答两个问题：

- 前端项目应该如何组织目录和页面路由
- 前端项目应该采用什么技术栈

本项目的前端目标不是做复杂后台系统，也不是做社区型产品，而是做一个清晰、稳定、适合搜索和筛选的资料查询网站。

---

## 2. 前端项目定位

前端项目负责以下职责：

- 展示品牌、车型、配置、零部件数据
- 提供列表浏览、详情查看、筛选和搜索能力
- 消费 FastAPI 提供的后端接口
- 为网站提供良好的 SEO、首屏体验和可维护的页面结构

因此，前端应被定位为一个“公开资料查询站”的 Web 客户端，而不是单纯的内部后台界面。

---

## 3. 前端技术选型结论

本项目推荐采用以下技术栈：

- 框架：`Next.js`
- UI 框架：`React`
- 语言：`TypeScript`
- 样式方案：`Tailwind CSS`
- 基础组件方案：`shadcn/ui`
- 数据请求与缓存：`TanStack Query`
- 轻量状态管理：`Zustand`

这是当前项目最推荐的主栈。

---

## 4. 为什么推荐 Next.js 而不是纯 React SPA

本网站的核心页面包括：

- 品牌列表页
- 品牌详情页
- 车型列表页
- 车型详情页
- 配置列表页
- 配置详情页
- 零部件列表页
- 零部件详情页
- 搜索页

这些页面都具备以下特点：

- 路由清晰
- 列表和详情页面较多
- 很适合被搜索引擎收录
- 需要较好的首屏体验
- 适合服务端渲染或预渲染

在这种场景下：

- `Next.js` 比纯 `React + Vite` 更适合
- 因为它在 SEO、SSR、页面路由和内容型站点支持上更成熟

如果使用纯 SPA，会面临：

- SEO 处理更麻烦
- 首屏体验要额外优化
- 详情页收录能力不如 Next.js 自然

因此，本项目不建议优先选纯 React SPA。

---

## 5. 为什么当前更推荐 React / Next.js 而不是 Vue / Nuxt

Vue / Nuxt 并不是不能做这个项目，实际上：

- `Vue 3 + Nuxt 3` 也可以很好地支撑这个站点

但是结合本项目当前阶段，仍然更推荐：

- `React + Next.js`

原因包括：

- 公开资料查询站与 Next.js 的匹配度很高
- 列表、详情、搜索、筛选等场景在 React 生态下选择更多
- 前后端分离时，Next.js 作为前端消费 API 非常自然
- 后续如果继续扩展 SEO 内容页、博客页、导购页，也更顺

结论：

- 首选：`Next.js + React`
- 备选：`Nuxt 3 + Vue 3`

---

## 6. 页面路由设计

本项目的核心资源为：

- 品牌 `brands`
- 车型 `models`
- 配置 `builds`
- 零部件 `components`

因此，前端建议采用如下页面路由结构：

```text
/
├─ /brands
├─ /brands/[brandId]
├─ /models
├─ /models/[modelId]
├─ /builds
├─ /builds/[buildId]
├─ /components
├─ /components/[componentId]
├─ /search
└─ /about
```

这套路由结构的特点：

- 与后端 REST API 一一对应
- 资源边界明确
- 后续扩展 SEO 和详情页都方便
- 对用户来说易理解、易记忆

---

## 7. 页面职责设计

### 7.1 首页 `/`

首页建议承担以下功能：

- 网站定位说明
- 全站搜索入口
- 品牌 / 车型 / 配置 / 零部件四大入口
- 热门品牌或热门车型推荐

首页不建议做得太重，更适合作为导航页与搜索入口。

### 7.2 品牌列表页 `/brands`

主要功能：

- 展示品牌列表
- 支持品牌筛选
- 支持关键词搜索

建议筛选项：

- 国家 / 地区
- 定位
- 销售模式
- 主打赛道

### 7.3 品牌详情页 `/brands/[brandId]`

主要功能：

- 展示品牌基础信息
- 展示品牌简介
- 展示主打赛道
- 展示品牌旗下车型列表
- 提供官网跳转

### 7.4 车型列表页 `/models`

主要功能：

- 展示车型列表
- 提供多条件筛选

建议筛选项：

- 品牌
- 车型类别
- 材质
- 刹车类型
- 年代

### 7.5 车型详情页 `/models/[modelId]`

主要功能：

- 展示车型基础信息
- 展示车型参数
- 展示官方链接与备注
- 展示车型下属配置版本列表

### 7.6 配置列表页 `/builds`

主要功能：

- 展示整车 build 列表
- 支持买车导向筛选

建议筛选项：

- 品牌
- 车型
- 年份
- 价格区间
- 套件品牌
- 套件系列
- 是否电变
- 是否碟刹
- 把组形式

### 7.7 配置详情页 `/builds/[buildId]`

主要功能：

- 展示价格、套件、轮组、功率计、把组、重量等核心信息
- 展示所属品牌与车型上下文
- 提供官方链接

### 7.8 零部件列表页 `/components`

主要功能：

- 展示零部件库
- 支持按类别、品牌、系列筛选

### 7.9 零部件详情页 `/components/[componentId]`

主要功能：

- 展示零部件基础信息
- 展示官方链接和备注
- 后续可扩展展示“被哪些整车使用”

### 7.10 搜索页 `/search`

主要功能：

- 支持全站搜索
- 搜索结果按类型分组
- 支持品牌、车型、配置、零部件统一检索

---

## 8. 前端目录结构建议

推荐使用 `Next.js App Router`，目录结构建议如下：

```text
road-bike-frontend/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ brands/
│  │  │  ├─ page.tsx
│  │  │  └─ [brandId]/
│  │  │     └─ page.tsx
│  │  ├─ models/
│  │  │  ├─ page.tsx
│  │  │  └─ [modelId]/
│  │  │     └─ page.tsx
│  │  ├─ builds/
│  │  │  ├─ page.tsx
│  │  │  └─ [buildId]/
│  │  │     └─ page.tsx
│  │  ├─ components/
│  │  │  ├─ page.tsx
│  │  │  └─ [componentId]/
│  │  │     └─ page.tsx
│  │  ├─ search/
│  │  │  └─ page.tsx
│  │  └─ about/
│  │     └─ page.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ brands/
│  │  ├─ models/
│  │  ├─ builds/
│  │  ├─ components/
│  │  ├─ search/
│  │  └─ ui/
│  ├─ lib/
│  │  ├─ api/
│  │  ├─ utils/
│  │  └─ constants/
│  ├─ hooks/
│  ├─ types/
│  └─ styles/
├─ public/
└─ package.json
```

这套结构的优势：

- 页面层和组件层边界清晰
- 资源域拆分自然
- 方便多人协作
- 后续扩展不会太乱

---

## 9. 组件拆分建议

建议按资源域拆分组件，而不是把所有组件平铺到一个目录里。

推荐结构：

```text
components/
├─ layout/
├─ brands/
├─ models/
├─ builds/
├─ components/
├─ search/
└─ ui/
```

例如：

- `components/brands/brand-card.tsx`
- `components/brands/brand-filter-panel.tsx`
- `components/models/model-card.tsx`
- `components/builds/build-card.tsx`
- `components/components/component-card.tsx`
- `components/search/search-result-list.tsx`

这样做的好处是：

- 组件归属清楚
- 维护成本更低
- 页面与业务域更容易对应

---

## 10. API 调用层设计

由于后端已经是独立的 FastAPI 项目，因此前端应有独立的 API 调用层。

建议目录：

```text
src/lib/api/
├─ client.ts
├─ brands.ts
├─ models.ts
├─ builds.ts
├─ components.ts
└─ search.ts
```

职责建议：

- `client.ts`
  - 统一封装 fetch 基础逻辑
- `brands.ts`
  - `getBrands` / `getBrandDetail`
- `models.ts`
  - `getModels` / `getModelDetail`
- `builds.ts`
  - `getBuilds` / `getBuildDetail`
- `components.ts`
  - `getComponents` / `getComponentDetail`
- `search.ts`
  - `searchAll`

这样可以让前端代码与后端 API 更稳定地对应。

---

## 11. 状态管理建议

本项目不建议一开始使用过重的状态管理方案。

建议分层处理：

- 接口数据缓存：`TanStack Query`
- 页面局部状态：React `useState`
- 少量全局状态：`Zustand`

适合放入全局状态的内容包括：

- 当前筛选条件草稿
- 对比列表
- 一些 UI 开关状态

不建议当前阶段直接使用 Redux，因为对于这个项目来说成本偏高。

---

## 12. 样式与 UI 方案建议

推荐样式栈：

- `Tailwind CSS`
- `shadcn/ui`

原因：

- 构建查询站速度快
- 可控性高
- 不容易被大型组件库样式锁死
- 适合后续做品牌化调整

对于本项目，页面更偏信息型、结构型，因此建议：

- 统一栅格系统
- 统一卡片组件
- 统一筛选面板样式
- 统一详情页信息块样式

---

## 13. 页面布局建议

建议整体布局保持统一：

```text
顶部导航
搜索栏
主内容区
页脚
```

列表页建议布局：

- 左侧筛选栏
- 右侧列表结果区

详情页建议布局：

- 顶部标题区
- 基础信息区
- 关联数据区

这种布局更适合资料查询型网站，也便于后续扩展对比功能。

---

## 14. 与后端的协作方式

当前后端已采用：

- `FastAPI + MySQL`
- REST API 风格
- 前后端分离架构

因此前端与后端的协作方式建议为：

- 前端只通过 HTTP API 取数
- 后端负责业务数据组织与查询
- 前端不承担数据库相关逻辑
- 接口类型通过 TypeScript 类型定义约束

这会让职责边界非常清楚：

- 后端负责数据与查询
- 前端负责页面与交互

---

## 15. 备选技术栈说明

如果后续因为团队经验或开发偏好需要使用 Vue，也可以考虑：

- `Nuxt 3`
- `Vue 3`
- `TypeScript`
- `Tailwind CSS`
- `Vue Query`
- `Pinia`

这套方案同样可以完成当前项目。

但在当前阶段，仍然更推荐：

- `Next.js + React + TypeScript`

---

## 16. 最终结论

本项目在前后端分离架构下，前端最适合采用：

- `Next.js`
- `React`
- `TypeScript`
- `Tailwind CSS`
- `shadcn/ui`
- `TanStack Query`
- `Zustand`

同时，前端页面与目录结构应围绕以下资源设计：

- `brands`
- `models`
- `builds`
- `components`
- `search`

一句话总结：

这个公路车网站的前端，不应该做成一个杂乱的通用页面集合，而应该做成一个资源清晰、路由清楚、适合搜索与筛选、对 SEO 友好的资料查询型前端项目。
