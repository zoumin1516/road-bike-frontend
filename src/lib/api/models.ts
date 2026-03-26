import { apiFetch } from "@/lib/api/client";
import type { BuildListResponse } from "@/types/build";
import type { ModelItem, ModelListResponse } from "@/types/model";

export async function getModels(params?: {
  page?: number;
  page_size?: number;
  keyword?: string;
  brand_id?: string;
  bike_category?: string;
  frame_material?: string;
  brake_type?: string;
  is_active?: string;
  sort?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.page_size) searchParams.set("page_size", String(params.page_size));
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.brand_id) searchParams.set("brand_id", params.brand_id);
  if (params?.bike_category) searchParams.set("bike_category", params.bike_category);
  if (params?.frame_material) searchParams.set("frame_material", params.frame_material);
  if (params?.brake_type) searchParams.set("brake_type", params.brake_type);
  if (params?.is_active) searchParams.set("is_active", params.is_active);
  if (params?.sort) searchParams.set("sort", params.sort);

  const query = searchParams.toString();
  return apiFetch<ModelListResponse>(`/models${query ? `?${query}` : ""}`);
}

export async function getModelDetail(modelId: string) {
  const response = await apiFetch<{ data: ModelItem }>(`/models/${modelId}`);
  return response.data;
}

export async function getModelBuilds(modelId: string, params?: { page?: number; page_size?: number }) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.page_size) searchParams.set("page_size", String(params.page_size));

  const query = searchParams.toString();
  return apiFetch<BuildListResponse>(`/models/${modelId}/builds${query ? `?${query}` : ""}`);
}
