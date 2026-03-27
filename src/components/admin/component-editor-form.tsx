"use client";

import { useEffect, useState } from "react";

function compactStrings(values: Array<string | null | undefined>): string[] {
  return values.filter((value): value is string => Boolean(value));
}

import { updateComponentEntity } from "@/lib/api/admin";
import { getComponentDetail } from "@/lib/api/components";

export function ComponentEditorForm({
  selectedRecord,
  onSaved,
}: {
  selectedRecord?: { type: "brand" | "model" | "build" | "component"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] } | null;
  onSaved?: (payload: { type: "component"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] }) => void;
}) {
  const [componentCategory, setComponentCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [componentName, setComponentName] = useState("");
  const [series, setSeries] = useState("");
  const [weightG, setWeightG] = useState("");
  const [msrpCurrency, setMsrpCurrency] = useState("");
  const [msrpPrice, setMsrpPrice] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRecord || selectedRecord.type !== "component") return;

    setComponentName(selectedRecord.title || "");
    setBrandName(selectedRecord.subtitle || "");
    setMessage(`已载入零部件 ${selectedRecord.id}，正在同步完整字段。`);

    getComponentDetail(selectedRecord.id)
      .then((component) => {
        setComponentCategory(component.component_category || "");
        setBrandName(component.brand_name || "");
        setComponentName(component.component_name || "");
        setSeries(component.series || "");
        setWeightG(component.weight_g?.toString() || "");
        setMsrpCurrency(component.msrp_currency || "");
        setMsrpPrice(component.msrp_price?.toString() || "");
        setOfficialUrl(component.official_url || "");
        setNotes(component.notes || "");
        setMessage(`已载入零部件 ${selectedRecord.id}，可以继续编辑零部件信息。`);
      })
      .catch(() => {
        setComponentCategory("");
        setSeries("");
        setWeightG("");
        setMsrpCurrency("");
        setMsrpPrice("");
        setOfficialUrl("");
        setNotes("");
        setMessage(`已载入零部件 ${selectedRecord.id}，但未取回完整详情，可先手动填写。`);
      });
  }, [selectedRecord]);

  if (!selectedRecord || selectedRecord.type !== "component") {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRecord || selectedRecord.type !== "component") {
      setMessage("请先选择一个零部件记录。");
      return;
    }

    const token = localStorage.getItem("rb_admin_token");
    if (!token) {
      setMessage("请先登录后台。");
      return;
    }

    const currentRecord = selectedRecord;

    setLoading(true);
    setMessage(null);

    try {
      const result = await updateComponentEntity(token, currentRecord.id, {
        component_category: componentCategory,
        brand_name: brandName,
        component_name: componentName,
        series: series || undefined,
        weight_g: weightG ? Number(weightG) : undefined,
        msrp_currency: msrpCurrency || undefined,
        msrp_price: msrpPrice ? Number(msrpPrice) : undefined,
        official_url: officialUrl || undefined,
        notes: notes || undefined,
      });
      onSaved?.({
        type: "component",
        id: currentRecord.id,
        title: componentName,
        subtitle: brandName || series || null,
        meta: compactStrings([componentCategory, series, msrpPrice ? `${msrpCurrency || "USD"} ${msrpPrice}` : null]).join(" · ") || null,
        imageUrl: currentRecord.imageUrl,
        facts: compactStrings([componentCategory, series, msrpPrice ? `${msrpCurrency || "USD"} ${msrpPrice}` : null]),
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
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Component Editor</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">零部件信息编辑</h2>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input value={componentCategory} onChange={(e) => setComponentCategory(e.target.value)} placeholder="零部件分类" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="品牌名称" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={componentName} onChange={(e) => setComponentName(e.target.value)} placeholder="零部件名称" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={series} onChange={(e) => setSeries(e.target.value)} placeholder="系列" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={weightG} onChange={(e) => setWeightG(e.target.value)} placeholder="重量 (g)" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={msrpCurrency} onChange={(e) => setMsrpCurrency(e.target.value)} placeholder="价格币种" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={msrpPrice} onChange={(e) => setMsrpPrice(e.target.value)} placeholder="价格" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <input value={officialUrl} onChange={(e) => setOfficialUrl(e.target.value)} placeholder="官方链接" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="备注" className="min-h-[120px] rounded-[1.2rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:opacity-60">
          {loading ? "保存中..." : "保存零部件信息"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
    </section>
  );
}
