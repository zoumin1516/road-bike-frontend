"use client";

import { useEffect, useState } from "react";

import { updateBrandEntity } from "@/lib/api/admin";
import { getBrandDetail } from "@/lib/api/brands";

export function BrandEditorForm({
  selectedRecord,
  onSaved,
}: {
  selectedRecord?: { type: "brand" | "model" | "build" | "component"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] } | null;
  onSaved?: (payload: { type: "brand"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] }) => void;
}) {
  const [brandNameEn, setBrandNameEn] = useState("");
  const [brandNameCn, setBrandNameCn] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [brandType, setBrandType] = useState("");
  const [marketPositioning, setMarketPositioning] = useState("");
  const [salesModel, setSalesModel] = useState("");
  const [categories, setCategories] = useState("");
  const [officialWebsite, setOfficialWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRecord || selectedRecord.type !== "brand") return;

    setBrandNameEn(selectedRecord.title || "");
    setBrandNameCn(selectedRecord.subtitle || "");
    setMessage(`已载入品牌 ${selectedRecord.id}，正在同步完整字段。`);

    getBrandDetail(selectedRecord.id)
      .then((brand) => {
        setBrandNameEn(brand.brand_name_en || "");
        setBrandNameCn(brand.brand_name_cn || "");
        setCountryRegion(brand.country_region || "");
        setBrandType(brand.brand_type || "");
        setMarketPositioning(brand.market_positioning || "");
        setSalesModel(brand.sales_model || "");
        setCategories(brand.main_road_categories || "");
        setOfficialWebsite(brand.official_website || "");
        setNotes(brand.notes || "");
        setMessage(`已载入品牌 ${selectedRecord.id}，可以继续编辑品牌信息。`);
      })
      .catch(() => {
        setCountryRegion("");
        setBrandType("");
        setMarketPositioning("");
        setSalesModel("");
        setCategories("");
        setOfficialWebsite("");
        setNotes("");
        setMessage(`已载入品牌 ${selectedRecord.id}，但未取回完整详情，可先手动填写。`);
      });
  }, [selectedRecord]);

  if (!selectedRecord || selectedRecord.type !== "brand") {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem("rb_admin_token");
    if (!token) {
      setMessage("请先登录后台。");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await updateBrandEntity(token, selectedRecord.id, {
        brand_name_en: brandNameEn,
        brand_name_cn: brandNameCn || undefined,
        country_region: countryRegion || undefined,
        brand_type: brandType || undefined,
        market_positioning: marketPositioning || undefined,
        sales_model: salesModel || undefined,
        main_road_categories: categories || undefined,
        official_website: officialWebsite || undefined,
        notes: notes || undefined,
      });
      onSaved?.({
        type: "brand",
        id: selectedRecord.id,
        title: brandNameEn,
        subtitle: brandNameCn || countryRegion || null,
        meta: [countryRegion, marketPositioning, salesModel].filter(Boolean).join(" · ") || null,
        imageUrl: selectedRecord.imageUrl,
        facts: [countryRegion, marketPositioning, salesModel].filter(Boolean),
      });
      setMessage(result.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Brand Editor</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">品牌信息编辑</h2>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input value={brandNameEn} onChange={(e) => setBrandNameEn(e.target.value)} placeholder="品牌英文名" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={brandNameCn} onChange={(e) => setBrandNameCn(e.target.value)} placeholder="品牌中文名" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={countryRegion} onChange={(e) => setCountryRegion(e.target.value)} placeholder="国家 / 地区" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={brandType} onChange={(e) => setBrandType(e.target.value)} placeholder="品牌类型" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={marketPositioning} onChange={(e) => setMarketPositioning(e.target.value)} placeholder="市场定位" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={salesModel} onChange={(e) => setSalesModel(e.target.value)} placeholder="销售模式" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={categories} onChange={(e) => setCategories(e.target.value)} placeholder="主打公路类别" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={officialWebsite} onChange={(e) => setOfficialWebsite(e.target.value)} placeholder="官网地址" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="备注" className="min-h-[120px] rounded-[1.2rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:opacity-60">
          {loading ? "保存中..." : "保存品牌信息"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
    </section>
  );
}
