# 公路车资料查询网站前端页面信息架构文档

## 1. 文档目标

本文档用于定义公路车资料查询网站前端各类页面的信息架构，明确每个页面应该展示什么内容、采用什么布局、承担什么功能，以及与后端 API 的对应关系。

本项目当前目标是一个“品牌 / 车型 / 配置 / 零部件”的资料查询网站，因此页面设计重点不是互动社区，而是：

- 查找效率
- 信息清晰度
- 页面一致性
- 筛选和搜索体验

---

## 2. 整体页面架构

网站建议由以下页面组成：

```text
首页
├─ 品牌列表页
├─ 品牌详情页
├─ 车型列表页
├─ 车型详情页
├─ 配置列表页
├─ 配置详情页
├─ 零部件列表页
├─ 零部件详情页
├─ 搜索结果页
└─ About 页
```

所有页面应共享统一的头部导航、搜索入口和页脚结构。

---

## 3. 全站通用布局

建议所有页面统一采用以下布局：

```text
顶部导航
搜索栏 / 页面标题区
主内容区
页脚
```

### 3.1 顶部导航

建议包含：

- 网站 Logo / 名称
- 品牌库入口
- 车型库入口
- 配置库入口
- 零部件库入口
- 搜索入口

### 3.2 搜索栏

建议在以下页面保持显著：

- 首页
- 列表页
- 搜索结果页
- 详情页顶部

### 3.3 主内容区

根据页面类型分为两种：

- 列表页：左侧筛选栏 + 右侧结果区
- 详情页：标题区 + 信息区 + 关联数据区

---

## 4. 首页 `/`

### 4.1 页面目标

首页的作用不是承载所有信息，而是：

- 告诉用户这个站是做什么的
- 提供全站搜索入口
- 提供 4 个核心资源入口
- 引导用户开始浏览和查询

### 4.2 首页模块建议

#### 模块 1：Hero 区

展示：

- 网站名称
- 简短说明
- 主搜索框
- 快速入口按钮

示例内容：

- 搜索品牌、车型、配置和零部件
- 快速进入品牌库 / 车型库 / 配置库 / 零部件库

#### 模块 2：四大资源入口卡片

- 品牌库
- 车型库
- 配置库
- 零部件库

每张卡片包含：

- 名称
- 简短描述
- 跳转按钮

#### 模块 3：推荐内容区（可选）

可展示：

- 热门品牌
- 热门车型
- 最近补充的数据

### 4.3 首页对应后端接口

- `GET /api/search`
- `GET /api/brands`
- `GET /api/models`

---

## 5. 品牌列表页 `/brands`

### 5.1 页面目标

品牌列表页用于：

- 让用户快速浏览品牌库
- 支持按维度筛选品牌
- 支持关键词查品牌

### 5.2 页面布局建议

```text
页面标题
左侧筛选栏 | 右侧品牌卡片列表
```

### 5.3 筛选项建议

- 国家 / 地区
- 市场定位
- 销售模式
- 品牌类型
- 主打赛道

### 5.4 品牌卡片字段建议

每张卡片展示：

- `brand_name_en`
- `brand_name_cn`
- `country_region`
- `market_positioning`
- `sales_model`
- `main_road_categories`
- `official_website`

### 5.5 品牌列表页对应 API

- `GET /api/brands`
- `GET /api/meta/filters`

---

## 6. 品牌详情页 `/brands/[brandId]`

### 6.1 页面目标

品牌详情页主要解决：

- 这个品牌是谁
- 来自哪里
- 主打什么
- 旗下有哪些公路车型

### 6.2 页面结构建议

#### 模块 1：品牌头部信息

展示：

- 英文品牌名
- 中文品牌名
- 国家 / 地区
- 定位
- 销售模式
- 官网链接

#### 模块 2：品牌简介

展示：

- `notes`

#### 模块 3：主打赛道标签

展示：

- `main_road_categories`

#### 模块 4：旗下车型列表

展示：

- 该品牌下的所有车型卡片

车型卡片可显示：

- `model_name`
- `bike_category`
- `frame_material`
- `brake_type`

### 6.3 品牌详情页对应 API

- `GET /api/brands/{brand_id}`
- `GET /api/brands/{brand_id}/models`

---

## 7. 车型列表页 `/models`

### 7.1 页面目标

车型列表页用于：

- 浏览全站车型库
- 对车型进行筛选
- 进入车型详情页

### 7.2 页面布局建议

```text
页面标题
左侧筛选栏 | 右侧车型卡片列表
```

### 7.3 筛选项建议

- 品牌
- 车型类别
- 车架材质
- 刹车类型
- 是否在售
- 年代

### 7.4 车型卡片字段建议

- `model_name`
- `series_name`
- `brand_id` 或品牌名
- `bike_category`
- `frame_material`
- `brake_type`
- `tire_clearance_mm`
- `current_generation_year`

### 7.5 车型列表页对应 API

- `GET /api/models`
- `GET /api/meta/filters`

---

## 8. 车型详情页 `/models/[modelId]`

### 8.1 页面目标

车型详情页主要解决：

- 这个车型的核心属性是什么
- 属于哪个品牌
- 它有哪些配置版本

### 8.2 页面结构建议

#### 模块 1：车型头部信息

展示：

- `model_name`
- `series_name`
- 品牌名
- `bike_category`

#### 模块 2：核心参数区

展示：

- `frame_material`
- `brake_type`
- `tire_clearance_mm`
- `release_year_first`
- `current_generation_year`
- `is_active`
- `official_model_url`

#### 模块 3：车型说明

展示：

- `notes`

#### 模块 4：配置版本列表

展示该车型下所有 build。

build 卡片建议显示：

- `build_name`
- `model_year`
- `msrp_price`
- `groupset_series`
- `wheel_brand`
- `claimed_weight_kg`

### 8.3 车型详情页对应 API

- `GET /api/models/{model_id}`
- `GET /api/models/{model_id}/builds`

---

## 9. 配置列表页 `/builds`

### 9.1 页面目标

配置列表页是全站购买决策价值最高的页面之一，主要用于：

- 浏览整车配置版本
- 按价格和套件筛选整车
- 找到适合自己的配置

### 9.2 页面布局建议

```text
页面标题
左侧筛选栏 | 右侧 build 列表
```

### 9.3 筛选项建议

- 品牌
- 车型
- 年份
- 价格区间
- 套件品牌
- 套件系列
- 是否电变
- 是否碟刹
- 把组形式

### 9.4 build 卡片字段建议

- `build_name`
- 所属车型名
- 所属品牌名
- `msrp_price`
- `groupset_brand`
- `groupset_series`
- `wheel_brand`
- `wheel_model`
- `claimed_weight_kg`
- `is_electronic_shifting`

### 9.5 配置列表页对应 API

- `GET /api/builds`
- `GET /api/meta/filters`

---

## 10. 配置详情页 `/builds/[buildId]`

### 10.1 页面目标

配置详情页用于完整展示单台整车配置的核心参数。

### 10.2 页面结构建议

#### 模块 1：标题区

展示：

- `build_name`
- 所属车型
- 所属品牌

#### 模块 2：价格信息

展示：

- `msrp_currency`
- `msrp_price`
- `market_region`
- `model_year`

#### 模块 3：传动与轮组信息

展示：

- `groupset_brand`
- `groupset_series`
- `wheel_brand`
- `wheel_model`

#### 模块 4：其他配置参数

展示：

- `power_meter`
- `cockpit_type`
- `claimed_weight_kg`
- `is_disc`
- `is_electronic_shifting`
- `is_stock_complete_bike`

#### 模块 5：官方链接与备注

展示：

- `official_build_url`
- `notes`

### 10.3 配置详情页对应 API

- `GET /api/builds/{build_id}`

---

## 11. 零部件列表页 `/components`

### 11.1 页面目标

零部件列表页用于：

- 浏览套件、轮组、轮胎、功率计等资料
- 按类别和品牌筛选
- 进入零部件详情页

### 11.2 页面布局建议

```text
页面标题
左侧筛选栏 | 右侧零部件卡片列表
```

### 11.3 筛选项建议

- 零部件类别
- 品牌
- 系列

### 11.4 零部件卡片字段建议

- `component_name`
- `brand_name`
- `component_category`
- `series`
- `official_url`

### 11.5 零部件列表页对应 API

- `GET /api/components`
- `GET /api/meta/filters`

---

## 12. 零部件详情页 `/components/[componentId]`

### 12.1 页面目标

零部件详情页用于展示某个组件本身的资料信息。

### 12.2 页面结构建议

#### 模块 1：头部信息

展示：

- `component_name`
- `brand_name`
- `component_category`
- `series`

#### 模块 2：参数区

展示：

- `weight_g`
- `msrp_currency`
- `msrp_price`

#### 模块 3：官方链接与备注

展示：

- `official_url`
- `notes`

#### 模块 4：关联 build（后续增强）

后续如后端支持，可补：

- 哪些整车配置使用了这个组件

### 12.3 零部件详情页对应 API

- `GET /api/components/{component_id}`

---

## 13. 搜索结果页 `/search`

### 13.1 页面目标

搜索页用于承接全站搜索行为。

支持用户搜索：

- 品牌名
- 车型名
- 配置名
- 套件名
- 零部件名

### 13.2 页面布局建议

```text
搜索栏
筛选 / 类型切换（可选）
结果列表
```

### 13.3 搜索结果展示方式

建议按类型展示：

- 品牌结果
- 车型结果
- 配置结果
- 零部件结果

每条结果建议包含：

- 标题
- 类型标签
- 副标题
- 跳转链接

### 13.4 搜索页对应 API

- `GET /api/search?q=...`

---

## 14. About 页 `/about`

### 14.1 页面目标

用于说明网站定位与边界，例如：

- 本站是资料查询站
- 当前数据范围
- 数据来源方式
- 后续更新计划

### 14.2 About 页模块建议

- 网站简介
- 数据范围说明
- 当前覆盖内容
- 联系方式 / 更新说明（可选）

---

## 15. 列表页和详情页的统一设计原则

### 15.1 列表页原则

- 重点在筛选和快速浏览
- 卡片信息不要过载
- 列表字段保持一致
- 支持分页

### 15.2 详情页原则

- 重点在信息完整
- 顶部先给核心结论
- 中部给结构化参数
- 底部给关联资源

### 15.3 搜索页原则

- 搜索框始终显著
- 搜索结果尽量按资源类型组织
- 支持从搜索直接跳详情

---

## 16. 与后端 API 的映射关系总结

前端页面与后端接口的大致映射如下：

- 首页
  - `GET /api/search`
  - `GET /api/brands`
  - `GET /api/models`

- 品牌列表页
  - `GET /api/brands`
  - `GET /api/meta/filters`

- 品牌详情页
  - `GET /api/brands/{brand_id}`
  - `GET /api/brands/{brand_id}/models`

- 车型列表页
  - `GET /api/models`
  - `GET /api/meta/filters`

- 车型详情页
  - `GET /api/models/{model_id}`
  - `GET /api/models/{model_id}/builds`

- 配置列表页
  - `GET /api/builds`
  - `GET /api/meta/filters`

- 配置详情页
  - `GET /api/builds/{build_id}`

- 零部件列表页
  - `GET /api/components`
  - `GET /api/meta/filters`

- 零部件详情页
  - `GET /api/components/{component_id}`

- 搜索页
  - `GET /api/search`

---

## 17. 最终结论

本项目的前端页面设计应围绕“查找”和“展示”展开，而不是围绕交互噱头展开。

页面信息架构的核心原则是：

- 首页做入口
- 列表页做筛选
- 详情页做完整展示
- 搜索页做统一检索
- 所有页面围绕 `brands / models / builds / components` 四类核心资源展开

一句话总结：

这个网站的前端页面，不需要花哨复杂，但一定要信息组织清楚、跳转路径顺、搜索与筛选好用，这才是一个公路车资料查询网站最核心的价值。
