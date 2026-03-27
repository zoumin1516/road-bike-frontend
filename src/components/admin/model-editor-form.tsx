"use client";

import { useEffect, useState } from "react";

import { updateModelEntity } from "@/lib/api/admin";

export function ModelEditorForm({
  selectedRecord,
  onSaved,
}: {
  selectedRecord?: { type: "brand" | "model" | "build" | "component"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] } | null;
  onSaved?: (payload: { type: "model"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] }) => void;
}) {
  const [modelName, setModelName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [bikeCategory, setBikeCategory] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("");
  const [brakeType, setBrakeType] = useState("");
  const [releaseYearFirst, setReleaseYearFirst] = useState("");
  const [currentGenerationYear, setCurrentGenerationYear] = useState("");
  const [officialModelUrl, setOfficialModelUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRecord || selectedRecord.type !== "model") return;
    setModelName(selectedRecord.title || "");
    setSeriesName(selectedRecord.subtitle || "");
    setBikeCategory("");
    setFrameMaterial("");
    setBrakeType("");
    setReleaseYearFirst("");
    setCurrentGenerationYear("");
    setOfficialModelUrl("");
    setNotes("");
    setMessage(`已载入车型 ${selectedRecord.id}，可以继续编辑车型信息。`);
  }, [selectedRecord]);

  if (!selectedRecord || selectedRecord.type !== "model") {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRecord || selectedRecord.type !== "model") {
      setMessage("请先选择一个车型记录。");
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
      const result = await updateModelEntity(token, currentRecord.id, {
        model_name: modelName,
        series_name: seriesName || undefined,
        bike_category: bikeCategory || undefined,
        frame_material: frameMaterial || undefined,
        brake_type: brakeType || undefined,
        release_year_first: releaseYearFirst ? Number(releaseYearFirst) : undefined,
        current_generation_year: currentGenerationYear ? Number(currentGenerationYear) : undefined,
        official_model_url: officialModelUrl || undefined,
        notes: notes || undefined,
      });
      onSaved?.({
        type: "model",
        id: currentRecord.id,
        title: modelName,
        subtitle: seriesName || bikeCategory || null,
        meta: [frameMaterial, brakeType, currentGenerationYear].filter(Boolean).join(" · ") || null,
        imageUrl: currentRecord.imageUrl,
        facts: [frameMaterial, brakeType, currentGenerationYear].filter(Boolean),
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
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Model Editor</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">车型信息编辑</h2>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="车型名称" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={seriesName} onChange={(e) => setSeriesName(e.target.value)} placeholder="系列名称" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={bikeCategory} onChange={(e) => setBikeCategory(e.target.value)} placeholder="车型类别" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={frameMaterial} onChange={(e) => setFrameMaterial(e.target.value)} placeholder="车架材质" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <input value={brakeType} onChange={(e) => setBrakeType(e.target.value)} placeholder="刹车类型" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={releaseYearFirst} onChange={(e) => setReleaseYearFirst(e.target.value)} placeholder="首发年份" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={currentGenerationYear} onChange={(e) => setCurrentGenerationYear(e.target.value)} placeholder="当前代年份" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <input value={officialModelUrl} onChange={(e) => setOfficialModelUrl(e.target.value)} placeholder="官方车型链接" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="备注" className="min-h-[120px] rounded-[1.2rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:opacity-60">
          {loading ? "保存中..." : "保存车型信息"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
    </section>
  );
}
