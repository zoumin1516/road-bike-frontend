import { siteConfig } from "@/lib/constants/site";

export type AdminLoginResponse = {
  access_token: string;
  token_type: string;
};

export async function loginAdmin(username: string, password: string) {
  let response: Response;

  try {
    response = await fetch(`${siteConfig.apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  } catch (error) {
    throw new Error(error instanceof Error ? `网络请求失败：${error.message}` : "网络请求失败");
  }

  if (!response.ok) {
    let detail = "登录失败";

    try {
      const errorBody = (await response.json()) as { detail?: string };
      if (errorBody?.detail) {
        detail = errorBody.detail;
      }
    } catch {
      detail = response.statusText || detail;
    }

    throw new Error(`登录失败（${response.status}）：${detail}`);
  }

  return response.json() as Promise<AdminLoginResponse>;
}

export async function updateBrandMedia(token: string, brandId: string, payload: { logo_url?: string; hero_image_url?: string }) {
  return adminFetch(token, `/admin/media/brands/${brandId}`, payload);
}

export async function updateModelMedia(token: string, modelId: string, payload: { image_url?: string; hero_image_url?: string }) {
  return adminFetch(token, `/admin/media/models/${modelId}`, payload);
}

export async function updateBuildMedia(token: string, buildId: string, payload: { image_url?: string; hero_image_url?: string }) {
  return adminFetch(token, `/admin/media/builds/${buildId}`, payload);
}

export async function updateComponentMedia(token: string, componentId: string, payload: { image_url?: string; hero_image_url?: string }) {
  return adminFetch(token, `/admin/media/components/${componentId}`, payload);
}

export async function getCurrentAdmin(token: string) {
  const response = await fetch(`${siteConfig.apiBaseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`登录状态失效（${response.status}）`);
  }

  return response.json() as Promise<{ username: string }>;
}

export async function updateBrandEntity(
  token: string,
  brandId: string,
  payload: {
    brand_name_en: string;
    brand_name_cn?: string;
    country_region?: string;
    brand_type?: string;
    market_positioning?: string;
    sales_model?: string;
    main_road_categories?: string;
    official_website?: string;
    notes?: string;
  },
) {
  const response = await fetch(`${siteConfig.apiBaseUrl}/admin/entities/brands/${brandId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`品牌保存失败：${response.status}`);
  }

  return response.json() as Promise<{ status: string; message: string; data: Record<string, string | null> }>;
}

export async function updateModelEntity(
  token: string,
  modelId: string,
  payload: {
    model_name: string;
    series_name?: string;
    bike_category?: string;
    frame_material?: string;
    brake_type?: string;
    release_year_first?: number;
    current_generation_year?: number;
    official_model_url?: string;
    notes?: string;
  },
) {
  const response = await fetch(`${siteConfig.apiBaseUrl}/admin/entities/models/${modelId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`车型保存失败：${response.status}`);
  }

  return response.json() as Promise<{ status: string; message: string; data: Record<string, string | null> }>;
}

export async function updateBuildEntity(
  token: string,
  buildId: string,
  payload: {
    build_name: string;
    model_year?: number;
    market_region?: string;
    msrp_currency?: string;
    msrp_price?: number;
    groupset_brand?: string;
    groupset_series?: string;
    wheel_brand?: string;
    wheel_model?: string;
    power_meter?: string;
    cockpit_type?: string;
    claimed_weight_kg?: number;
    is_disc: boolean;
    is_electronic_shifting: boolean;
    is_stock_complete_bike: boolean;
    official_build_url?: string;
    notes?: string;
  },
) {
  const response = await fetch(`${siteConfig.apiBaseUrl}/admin/entities/builds/${buildId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`配置保存失败：${response.status}`);
  }

  return response.json() as Promise<{ status: string; message: string; data: Record<string, string | null> }>;
}

export async function updateComponentEntity(
  token: string,
  componentId: string,
  payload: {
    component_category: string;
    brand_name: string;
    component_name: string;
    series?: string;
    weight_g?: number;
    msrp_currency?: string;
    msrp_price?: number;
    official_url?: string;
    notes?: string;
  },
) {
  const response = await fetch(`${siteConfig.apiBaseUrl}/admin/entities/components/${componentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`零部件保存失败：${response.status}`);
  }

  return response.json() as Promise<{ status: string; message: string; data: Record<string, string | null> }>;
}

async function adminFetch(token: string, path: string, body: object) {
  const response = await fetch(`${siteConfig.apiBaseUrl}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`保存失败：${response.status}`);
  }

  return response.json() as Promise<{ status: string; message: string }>;
}
