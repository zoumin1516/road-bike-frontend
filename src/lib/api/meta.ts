import { apiFetch } from "@/lib/api/client";
import type { FilterMetaResponse } from "@/types/meta";

export async function getFilterMeta() {
  return apiFetch<FilterMetaResponse>("/meta/filters");
}
