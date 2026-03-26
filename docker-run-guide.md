# Docker 运行说明

## 1. 后端镜像

在后端目录构建：

```bash
cd /Users/jyxc-dz-0100528/Project/road-bike-backend
docker build -t road-bike-backend:latest .
```

运行后端容器：

```bash
docker run -d \
  --name road-bike-backend \
  -p 8000:8000 \
  -e APP_NAME="Road Bike API" \
  -e APP_ENV=prod \
  -e DEBUG=false \
  -e MYSQL_HOST=host.docker.internal \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=change_me \
  -e MYSQL_DATABASE=road_bike_db \
  road-bike-backend:latest
```

说明：

- `MYSQL_HOST=host.docker.internal` 适合容器连接宿主机 MySQL
- 如果你的 MySQL 也在 Docker 里，改成对应容器网络名即可
- 健康检查地址：`http://127.0.0.1:8000/api/health`

---

## 2. 前端镜像

前端项目默认把本地开发 API 地址写为：

- `http://127.0.0.1:8000/api`

这适用于你在宿主机上直接运行：

- `npm run dev`
- `npm run start`

如果前端运行在 Docker 容器里，而后端也在 Docker 网络中，请显式传入：

- `NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api`

在前端目录构建：

```bash
cd /Users/jyxc-dz-0100528/Project/road-bike-frontend
docker build -t road-bike-frontend:latest .
```

运行前端容器：

```bash
docker run -d \
  --name road-bike-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://host.docker.internal:8000/api \
  road-bike-frontend:latest
```

说明：

- 浏览器访问前端：`http://127.0.0.1:3000`
- 单容器前端连接宿主机后端时，使用 `host.docker.internal`
- 多容器场景下，推荐用容器服务名，例如 `http://backend:8000/api`

---

## 3. 推荐的一键启动顺序

先启动后端：

```bash
docker run -d \
  --name road-bike-backend \
  -p 8000:8000 \
  -e APP_ENV=prod \
  -e DEBUG=false \
  -e MYSQL_HOST=host.docker.internal \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=change_me \
  -e MYSQL_DATABASE=road_bike_db \
  road-bike-backend:latest
```

再启动前端：

```bash
docker run -d \
  --name road-bike-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://host.docker.internal:8000/api \
  road-bike-frontend:latest
```

---

## 4. 使用 docker compose 一键启动（含 MySQL）

项目根目录已经提供：

- `/Users/jyxc-dz-0100528/Project/docker-compose.yml`

当前 compose 已包含：

- `mysql`
- `backend`
- `frontend`

并已补齐：

- healthcheck
- depends_on 条件
- MySQL 持久化 volume
- MySQL 初始化目录挂载

在项目根目录执行：

```bash
cd /Users/jyxc-dz-0100528/Project
docker compose up -d --build
```

这里 compose 已经显式为前端注入：

- `NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api`

启动后访问：

- 前端：`http://127.0.0.1:3000`
- 后端：`http://127.0.0.1:8000`
- 健康检查：`http://127.0.0.1:8000/api/health`

### MySQL 初始化说明

MySQL 会挂载这个目录：

- `/Users/jyxc-dz-0100528/Project/docker/mysql/init`

你可以把 schema / seed SQL 放进去，例如：

- `001-schema.sql`
- `010-seed-brands.sql`
- `020-seed-models.sql`
- `030-seed-builds.sql`
- `040-seed-components.sql`

注意：

- 这些 SQL 只会在 MySQL 数据卷首次初始化时自动执行
- 如果数据库已经初始化过，再新增 SQL 文件不会自动执行
- 想重新初始化数据库，请执行：

```bash
cd /Users/jyxc-dz-0100528/Project
docker compose down -v
```

然后重新启动：

```bash
docker compose up -d --build
```

## 5. 常用命令

查看日志：

```bash
docker logs -f road-bike-backend
docker logs -f road-bike-frontend
# 或
docker compose logs -f
```

停止容器：

```bash
docker stop road-bike-backend road-bike-frontend
# 或
docker compose down
```

删除容器：

```bash
docker rm -f road-bike-backend road-bike-frontend
```
