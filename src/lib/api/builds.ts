import { apiFetch } from "@/lib/api/client";
import type { BuildItem, BuildListResponse } from "@/types/build";

export async function getBuilds(params?: {
  page?: number;
  page_size?: number;
  keyword?: string;
  brand_id?: string;
  model_id?: string;
  groupset_brand?: string;
  wheel_brand?: string;
  cockpit_type?: string;
  market_region?: string;
  is_electronic_shifting?: string;
  is_disc?: string;
  min_price?: string;
  max_price?: string;
  sort?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.page_size) searchParams.set("page_size", String(params.page_size));
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.brand_id) searchParams.set("brand_id", params.brand_id);
  if (params?.model_id) searchParams.set("model_id", params.model_id);
  if (params?.groupset_brand) searchParams.set("groupset_brand", params.groupset_brand);
  if (params?.wheel_brand) searchParams.set("wheel_brand", params.wheel_brand);
  if (params?.cockpit_type) searchParams.set("cockpit_type", params.cockpit_type);
  if (params?.market_region) searchParams.set("market_region", params.market_region);
  if (params?.is_electronic_shifting) searchParams.set("is_electronic_shifting", params.is_electronic_shifting);
  if (params?.is_disc) searchParams.set("is_disc", params.is_disc);
  if (params?.min_price) searchParams.set("min_price", params.min_price);
  if (params?.max_price) searchParams.set("max_price", params.max_price);
  if (params?.sort) searchParams.set("sort", params.sort);

  const query = searchParams.toString();
  return apiFetch<BuildListResponse>(`/builds${query ? `?${query}` : ""}`);
}

export async function getBuildDetail(buildId: string) {
  const response = await apiFetch<{ data: BuildItem }>(`/builds/${buildId}`);
  return response.data;
}
