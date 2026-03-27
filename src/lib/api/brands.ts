import { apiFetch } from "@/lib/api/client";
import type { BrandListResponse } from "@/types/brand";

import type { BrandItem } from "@/types/brand";

export async function getBrands(params?: {
  page?: number;
  page_size?: number;
  keyword?: string;
  country_region?: string;
  market_positioning?: string;
  sales_model?: string;
  brand_type?: string;
  sort?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.page_size) searchParams.set("page_size", String(params.page_size));
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.country_region) searchParams.set("country_region", params.country_region);
  if (params?.market_positioning) searchParams.set("market_positioning", params.market_positioning);
  if (params?.sales_model) searchParams.set("sales_model", params.sales_model);
  if (params?.brand_type) searchParams.set("brand_type", params.brand_type);
  if (params?.sort) searchParams.set("sort", params.sort);

  const query = searchParams.toString();
  return apiFetch<BrandListResponse>(`/brands${query ? `?${query}` : ""}`);
}

export async function getBrandDetail(brandId: string) {
  const response = await apiFetch<{ data: BrandItem }>(`/brands/${brandId}`);
  return response.data;
}
