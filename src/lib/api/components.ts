import { apiFetch } from "@/lib/api/client";
import type { ComponentItem, ComponentListResponse } from "@/types/component";

export async function getComponents(params?: {
  page?: number;
  page_size?: number;
  keyword?: string;
  component_category?: string;
  brand_name?: string;
  min_price?: string;
  max_price?: string;
  sort?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.page_size) searchParams.set("page_size", String(params.page_size));
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.component_category) searchParams.set("component_category", params.component_category);
  if (params?.brand_name) searchParams.set("brand_name", params.brand_name);
  if (params?.min_price) searchParams.set("min_price", params.min_price);
  if (params?.max_price) searchParams.set("max_price", params.max_price);
  if (params?.sort) searchParams.set("sort", params.sort);

  const query = searchParams.toString();
  return apiFetch<ComponentListResponse>(`/components${query ? `?${query}` : ""}`);
}

export async function getComponentDetail(componentId: string) {
  const response = await apiFetch<{ data: ComponentItem }>(`/components/${componentId}`);
  return response.data;
}
