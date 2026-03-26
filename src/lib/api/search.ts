import { apiFetch } from "@/lib/api/client";
import type { SearchResponse } from "@/types/search";

export async function searchAll(params: { q: string; page?: number; page_size?: number; type?: string }) {
  const searchParams = new URLSearchParams();
  searchParams.set("q", params.q);

  if (params.page) searchParams.set("page", String(params.page));
  if (params.page_size) searchParams.set("page_size", String(params.page_size));
  if (params.type) searchParams.set("type", params.type);

  return apiFetch<SearchResponse>(`/search?${searchParams.toString()}`);
}
