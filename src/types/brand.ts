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
  logo_url?: string | null;
  hero_image_url?: string | null;
  headquarters?: string | null;
  founded_year?: string | null;
  founder?: string | null;
  parent_company?: string | null;
  company_type?: string | null;
  ownership_type?: string | null;
  road_cycling_positioning?: string | null;
  target_audience?: string | null;
  price_tier?: string | null;
  brand_slogan?: string | null;
  brand_story?: string | null;
  mission?: string | null;
  core_values?: string | null;
  core_technologies?: string | null;
  r_and_d_capabilities?: string | null;
  flagship_platforms?: string | null;
  employee_count_range?: string | null;
  annual_revenue_range?: string | null;
  product_lines?: string | null;
  road_product_lines?: string | null;
  data_sources?: string | null;
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
