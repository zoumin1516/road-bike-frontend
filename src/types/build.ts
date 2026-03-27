export interface BuildItem {
  build_id: string;
  model_id: string;
  build_name: string;
  model_year?: number | null;
  market_region?: string | null;
  msrp_currency?: string | null;
  msrp_price?: number | null;
  groupset_brand?: string | null;
  groupset_series?: string | null;
  wheel_brand?: string | null;
  wheel_model?: string | null;
  power_meter?: string | null;
  cockpit_type?: string | null;
  claimed_weight_kg?: number | null;
  is_disc: boolean;
  is_electronic_shifting: boolean;
  is_stock_complete_bike: boolean;
  official_build_url?: string | null;
  image_url?: string | null;
  hero_image_url?: string | null;
  notes?: string | null;
}

export interface BuildListResponse {
  items: BuildItem[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: Record<string, string | number | boolean | null>;
}
