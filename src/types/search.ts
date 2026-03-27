export type SearchItemType = "brand" | "model" | "build" | "component" | string;

export interface SearchItem {
  type: SearchItemType;
  id: string;
  title: string;
  subtitle: string;
  image_url?: string | null;
}

export interface SearchResponse {
  items: SearchItem[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: Record<string, string | number | boolean | null>;
}
