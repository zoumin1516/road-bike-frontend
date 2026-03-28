const envApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const normalizedApiBaseUrl = envApiBaseUrl
  ? envApiBaseUrl.replace(/\/$/, "")
  : typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://127.0.0.1:8000/api";

export const siteConfig = {
  name: "Road Bike Database",
  description: "公路车品牌、车型、配置、套件的数据查询展示网站",
  apiBaseUrl: normalizedApiBaseUrl,
};
