"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getBrands } from "@/lib/api/brands";
import { getBuilds } from "@/lib/api/builds";
import { getComponents } from "@/lib/api/components";
import { getModels } from "@/lib/api/models";

type EntityType = "brand" | "model" | "build" | "component";

type BrowserRecord = {
  id: string;
  title: string;
  subtitle?: string | null;
  imageUrl?: string | null;
  meta?: string | null;
  details?: string[];
  facts?: string[];
  sortValue?: string | null;
};

const entityOptions: { value: EntityType; label: string }[] = [
  { value: "brand", label: "品牌" },
  { value: "model", label: "车型" },
  { value: "build", label: "配置" },
  { value: "component", label: "零部件" },
];

export function AdminRecordBrowser({
  onSelect,
  activeRecordId,
  refreshKey = 0,
}: {
  onSelect: (payload: { type: EntityType; id: string; title: string; imageUrl?: string | null }) => void;
  activeRecordId?: string | null;
  refreshKey?: number;
}) {
  const [entityType, setEntityType] = useState<EntityType>("brand");
  const [keyword, setKeyword] = useState("");
  const [records, setRecords] = useState<BrowserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState("12");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("");
  const [resultSummary, setResultSummary] = useState<string | null>(null);

  const helperText = useMemo(() => {
    if (entityType === "brand") return "按品牌英文名或中文名搜索";
    if (entityType === "model") return "按车型名或系列搜索";
    if (entityType === "build") return "按 build 名、套件或轮组搜索";
    return "按零部件名、品牌或系列搜索";
  }, [entityType]);

  useEffect(() => {
    if (keyword || records.length === 0) return;
    void handleSearch();
  }, [entityType, refreshKey]);

  async function handleSearch(event?: React.FormEvent<HTMLFormElement>) {
     if (event) event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let nextRecords: BrowserRecord[] = [];

      if (entityType === "brand") {
        const response = await getBrands({ keyword, page: page, page_size: Number(pageSize), sort: sort || undefined });
        nextRecords = response.items.map((item) => ({
          id: item.brand_id,
          title: item.brand_name_en,
          subtitle: item.brand_name_cn || item.country_region,
          meta: [item.country_region, item.market_positioning, item.sales_model].filter(Boolean).join(" · "),
          details: [item.brand_type, item.main_road_categories, item.official_website].filter(Boolean),
          facts: [item.country_region, item.market_positioning, item.sales_model].filter(Boolean),
          sortValue: item.brand_name_en,
          imageUrl: item.logo_url || item.hero_image_url,
        }));
        setPageInput(String(response.pagination.page));
        setTotalPages(response.pagination.total_pages);
        setResultSummary(`品牌结果 ${response.items.length} 条 / 共 ${response.pagination.total} 条 · 第 ${response.pagination.page}/${response.pagination.total_pages || 1} 页`);
      } else if (entityType === "model") {
        const response = await getModels({ keyword, page: page, page_size: Number(pageSize), sort: sort || undefined });
        nextRecords = response.items.map((item) => ({
          id: item.model_id,
          title: item.model_name,
          subtitle: item.series_name || item.bike_category,
          meta: [item.frame_material, item.brake_type, item.current_generation_year?.toString()].filter(Boolean).join(" · "),
          details: [item.bike_category, item.release_year_first?.toString(), item.official_model_url].filter(Boolean),
          facts: [item.frame_material, item.brake_type, item.current_generation_year?.toString()].filter(Boolean),
          sortValue: item.current_generation_year?.toString() || item.model_name,
          imageUrl: item.image_url || item.hero_image_url,
        }));
        setPageInput(String(response.pagination.page));
        setTotalPages(response.pagination.total_pages);
        setResultSummary(`车型结果 ${response.items.length} 条 / 共 ${response.pagination.total} 条 · 第 ${response.pagination.page}/${response.pagination.total_pages || 1} 页`);
      } else if (entityType === "build") {
        const response = await getBuilds({ keyword, page: page, page_size: Number(pageSize), sort: sort || undefined });
        nextRecords = response.items.map((item) => ({
          id: item.build_id,
          title: item.build_name,
          subtitle: item.groupset_series || item.groupset_brand || item.model_year?.toString(),
          meta: [item.model_year?.toString(), item.msrp_price ? `${item.msrp_currency || "USD"} ${item.msrp_price}` : null, item.cockpit_type].filter(Boolean).join(" · "),
          details: [item.wheel_brand, item.wheel_model, item.official_build_url].filter(Boolean),
          facts: [item.model_year?.toString(), item.cockpit_type, item.msrp_price ? `${item.msrp_currency || "USD"} ${item.msrp_price}` : null].filter(Boolean),
          sortValue: item.model_year?.toString() || item.build_name,
          imageUrl: item.image_url || item.hero_image_url,
        }));
        setPageInput(String(response.pagination.page));
        setTotalPages(response.pagination.total_pages);
        setResultSummary(`配置结果 ${response.items.length} 条 / 共 ${response.pagination.total} 条 · 第 ${response.pagination.page}/${response.pagination.total_pages || 1} 页`);
      } else {
        const response = await getComponents({ keyword, page: page, page_size: Number(pageSize), sort: sort || undefined });
        nextRecords = response.items.map((item) => ({
          id: item.component_id,
          title: item.component_name,
          subtitle: item.brand_name || item.series,
          meta: [item.component_category, item.series, item.msrp_price ? `${item.msrp_currency || "USD"} ${item.msrp_price}` : null].filter(Boolean).join(" · "),
          details: [item.weight_g ? `${item.weight_g} g` : null, item.official_url].filter(Boolean),
          facts: [item.component_category, item.series, item.msrp_price ? `${item.msrp_currency || "USD"} ${item.msrp_price}` : null].filter(Boolean),
          sortValue: item.msrp_price?.toString() || item.component_name,
          imageUrl: item.image_url || item.hero_image_url,
        }));
        setPageInput(String(response.pagination.page));
        setTotalPages(response.pagination.total_pages);
        setResultSummary(`零部件结果 ${response.items.length} 条 / 共 ${response.pagination.total} 条 · 第 ${response.pagination.page}/${response.pagination.total_pages || 1} 页`);
      }

      setRecords(nextRecords);
      if (nextRecords.length === 0) {
        setMessage("没有搜到结果，换个关键词试试。");
        setResultSummary(null);
        setTotalPages(0);
        setPageInput("1");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "搜索失败");
      setRecords([]);
      setResultSummary(null);
      setTotalPages(0);
      setPageInput("1");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Record Browser</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">查找记录</h2>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">先搜索目标条目，再点选到右侧编辑区自动带出 ID。</p>

      <form className="mt-5 grid gap-3" onSubmit={handleSearch}>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_120px_180px]">
        <select
          value={entityType}
          onChange={(event) => setEntityType(event.target.value as EntityType)}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        >
          {entityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            setPage(1);
          }}
          placeholder={helperText}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        <select
          value={pageSize}
          onChange={(event) => {
            setPageSize(event.target.value);
            setPage(1);
          }}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        >
          <option value="8">8 条</option>
          <option value="12">12 条</option>
          <option value="20">20 条</option>
        </select>
        <select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        >
          <option value="">默认排序</option>
          <option value="name_asc">名称升序</option>
          <option value="name_desc">名称降序</option>
          <option value="year_desc">年份降序</option>
          <option value="year_asc">年份升序</option>
          <option value="price_desc">价格降序</option>
          <option value="price_asc">价格升序</option>
          <option value="brand_asc">品牌升序</option>
          <option value="brand_desc">品牌降序</option>
        </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white px-5 text-sm font-semibold text-stone-800 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] disabled:opacity-60"
        >
          {loading ? "搜索中..." : "搜索记录"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
      {resultSummary ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">{resultSummary}</p> : null}

      <div className="mt-5 grid gap-3">
        {records.map((record) => (
          <button
            key={record.id}
            type="button"
            onClick={() => onSelect({ type: entityType, id: record.id, title: record.title, imageUrl: record.imageUrl })}
            className={`grid gap-3 rounded-[1.4rem] border px-4 py-3 text-left transition sm:grid-cols-[72px_minmax(0,1fr)] sm:items-center ${activeRecordId === record.id ? "border-[color:var(--accent)] bg-[rgba(191,91,44,0.08)]" : "border-[color:var(--line)] bg-white/78 hover:border-[color:var(--accent)] hover:bg-white"}`}
          >
            <div className="relative h-[72px] overflow-hidden rounded-[1rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(255,250,244,0.96),rgba(255,255,255,0.92))]">
              {record.imageUrl ? (
                <Image src={record.imageUrl} alt={record.title} fill sizes="72px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                  No Image
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-stone-900">{record.title}</p>
              <p className="mt-1 truncate text-xs text-[color:var(--muted)]">{record.id}</p>
              {record.subtitle ? <p className="mt-1 text-sm leading-6 text-stone-700">{record.subtitle}</p> : null}
              {record.meta ? <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{record.meta}</p> : null}
              {record.details?.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {record.details.slice(0, 2).map((detail) => (
                    <span key={detail} className="rounded-full border border-[color:var(--line)] bg-[rgba(255,248,240,0.92)] px-2.5 py-1 text-[10px] font-medium text-stone-700">
                      {detail}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3 text-sm text-stone-700">
          <span>第 {page} / {totalPages} 页</span>
          <div className="flex items-center gap-2">
            <input
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value)}
              className="h-9 w-16 rounded-xl border border-[color:var(--line)] bg-white px-2 text-center text-xs outline-none transition focus:border-[color:var(--accent)]"
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                const nextPage = Number(pageInput);
                if (!Number.isFinite(nextPage)) return;
                setPage(Math.min(Math.max(1, nextPage), totalPages));
              }}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-[color:var(--accent)] disabled:opacity-50"
            >
              Go
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-[color:var(--accent)] disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-[color:var(--accent)] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
