export interface BrandItem {
  brand_id: string;
  brand_name_en: string;
  brand_name_cn?: string | null;
  country_region?: string | null;
  brand_type?: string | null;
  market_positioning?: string | null;
  sales_model?: string | null;
  main_road_categories?: string | null;
  official_website?: string | null;
  notes?: string | null;
}

export interface BrandListResponse {
  items: BrandItem[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: Record<string, string | number | boolean | null>;
}
