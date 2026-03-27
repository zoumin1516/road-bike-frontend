export interface ComponentItem {
  component_id: string;
  component_category: string;
  brand_name: string;
  component_name: string;
  series?: string | null;
  weight_g?: number | null;
  msrp_currency?: string | null;
  msrp_price?: number | null;
  official_url?: string | null;
  image_url?: string | null;
  hero_image_url?: string | null;
  notes?: string | null;
}

export interface ComponentListResponse {
  items: ComponentItem[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: Record<string, string | number | boolean | null>;
}
