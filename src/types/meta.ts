export interface FilterMetaResponse {
  data: {
    country_regions: string[];
    sales_models: string[];
    market_positionings: string[];
    brand_types: string[];
    brand_names: { label: string; value: string }[];
    bike_categories: string[];
    frame_materials: string[];
    brake_types: string[];
    active_statuses: string[];
    groupset_brands: string[];
    wheel_brands: string[];
    cockpit_types: string[];
    market_regions: string[];
    electronic_shifting_options: string[];
    disc_options: string[];
    component_categories: string[];
    component_brands: string[];
  };
}
