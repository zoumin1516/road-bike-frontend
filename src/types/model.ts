export interface ModelItem {
  model_id: string;
  brand_id: string;
  model_name: string;
  series_name?: string | null;
  bike_category?: string | null;
  frame_material?: string | null;
  brake_type?: string | null;
  tire_clearance_mm?: number | null;
  release_year_first?: number | null;
  current_generation_year?: number | null;
  is_active: boolean;
  official_model_url?: string | null;
  notes?: string | null;
}

export interface ModelListResponse {
  items: ModelItem[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: Record<string, string | number | boolean | null>;
}
