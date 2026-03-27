"use client";

import { useEffect, useState } from "react";

import { updateBuildEntity } from "@/lib/api/admin";
import { getBuildDetail } from "@/lib/api/builds";

export function BuildEditorForm({
  selectedRecord,
  onSaved,
}: {
  selectedRecord?: { type: "brand" | "model" | "build" | "component"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] } | null;
  onSaved?: (payload: { type: "build"; id: string; title: string; subtitle?: string | null; meta?: string | null; imageUrl?: string | null; facts?: string[] }) => void;
}) {
  const [buildName, setBuildName] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [marketRegion, setMarketRegion] = useState("");
  const [msrpCurrency, setMsrpCurrency] = useState("");
  const [msrpPrice, setMsrpPrice] = useState("");
  const [groupsetBrand, setGroupsetBrand] = useState("");
  const [groupsetSeries, setGroupsetSeries] = useState("");
  const [wheelBrand, setWheelBrand] = useState("");
  const [wheelModel, setWheelModel] = useState("");
  const [powerMeter, setPowerMeter] = useState("");
  const [cockpitType, setCockpitType] = useState("");
  const [claimedWeightKg, setClaimedWeightKg] = useState("");
  const [isDisc, setIsDisc] = useState(true);
  const [isElectronicShifting, setIsElectronicShifting] = useState(false);
  const [isStockCompleteBike, setIsStockCompleteBike] = useState(true);
  const [officialBuildUrl, setOfficialBuildUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRecord || selectedRecord.type !== "build") return;

    setBuildName(selectedRecord.title || "");
    setMessage(`已载入配置 ${selectedRecord.id}，正在同步完整字段。`);

    getBuildDetail(selectedRecord.id)
      .then((build) => {
        setBuildName(build.build_name || "");
        setModelYear(build.model_year?.toString() || "");
        setMarketRegion(build.market_region || "");
        setMsrpCurrency(build.msrp_currency || "");
        setMsrpPrice(build.msrp_price?.toString() || "");
        setGroupsetBrand(build.groupset_brand || "");
        setGroupsetSeries(build.groupset_series || "");
        setWheelBrand(build.wheel_brand || "");
        setWheelModel(build.wheel_model || "");
        setPowerMeter(build.power_meter || "");
        setCockpitType(build.cockpit_type || "");
        setClaimedWeightKg(build.claimed_weight_kg?.toString() || "");
        setIsDisc(build.is_disc);
        setIsElectronicShifting(build.is_electronic_shifting);
        setIsStockCompleteBike(build.is_stock_complete_bike);
        setOfficialBuildUrl(build.official_build_url || "");
        setNotes(build.notes || "");
        setMessage(`已载入配置 ${selectedRecord.id}，可以继续编辑配置信息。`);
      })
      .catch(() => {
        setModelYear("");
        setMarketRegion("");
        setMsrpCurrency("");
        setMsrpPrice("");
        setGroupsetBrand("");
        setGroupsetSeries("");
        setWheelBrand("");
        setWheelModel("");
        setPowerMeter("");
        setCockpitType("");
        setClaimedWeightKg("");
        setIsDisc(true);
        setIsElectronicShifting(false);
        setIsStockCompleteBike(true);
        setOfficialBuildUrl("");
        setNotes("");
        setMessage(`已载入配置 ${selectedRecord.id}，但未取回完整详情，可先手动填写。`);
      });
  }, [selectedRecord]);

  if (!selectedRecord || selectedRecord.type !== "build") {
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
      const result = await updateBuildEntity(token, selectedRecord.id, {
        build_name: buildName,
        model_year: modelYear ? Number(modelYear) : undefined,
        market_region: marketRegion || undefined,
        msrp_currency: msrpCurrency || undefined,
        msrp_price: msrpPrice ? Number(msrpPrice) : undefined,
        groupset_brand: groupsetBrand || undefined,
        groupset_series: groupsetSeries || undefined,
        wheel_brand: wheelBrand || undefined,
        wheel_model: wheelModel || undefined,
        power_meter: powerMeter || undefined,
        cockpit_type: cockpitType || undefined,
        claimed_weight_kg: claimedWeightKg ? Number(claimedWeightKg) : undefined,
        is_disc: isDisc,
        is_electronic_shifting: isElectronicShifting,
        is_stock_complete_bike: isStockCompleteBike,
        official_build_url: officialBuildUrl || undefined,
        notes: notes || undefined,
      });
      onSaved?.({
        type: "build",
        id: selectedRecord.id,
        title: buildName,
        subtitle: groupsetSeries || groupsetBrand || modelYear || null,
        meta: [modelYear, msrpPrice ? `${msrpCurrency || "USD"} ${msrpPrice}` : null, cockpitType].filter(Boolean).join(" · ") || null,
        imageUrl: selectedRecord.imageUrl,
        facts: [modelYear, cockpitType, msrpPrice ? `${msrpCurrency || "USD"} ${msrpPrice}` : null].filter(Boolean),
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
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Build Editor</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">配置信息编辑</h2>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input value={buildName} onChange={(e) => setBuildName(e.target.value)} placeholder="配置名称" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={modelYear} onChange={(e) => setModelYear(e.target.value)} placeholder="年份" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={marketRegion} onChange={(e) => setMarketRegion(e.target.value)} placeholder="市场区域" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={msrpCurrency} onChange={(e) => setMsrpCurrency(e.target.value)} placeholder="价格币种" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={msrpPrice} onChange={(e) => setMsrpPrice(e.target.value)} placeholder="价格" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={groupsetBrand} onChange={(e) => setGroupsetBrand(e.target.value)} placeholder="套件品牌" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={groupsetSeries} onChange={(e) => setGroupsetSeries(e.target.value)} placeholder="套件系列" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={wheelBrand} onChange={(e) => setWheelBrand(e.target.value)} placeholder="轮组品牌" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={wheelModel} onChange={(e) => setWheelModel(e.target.value)} placeholder="轮组型号" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={powerMeter} onChange={(e) => setPowerMeter(e.target.value)} placeholder="功率计" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
          <input value={cockpitType} onChange={(e) => setCockpitType(e.target.value)} placeholder="座舱类型" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        </div>
        <input value={claimedWeightKg} onChange={(e) => setClaimedWeightKg(e.target.value)} placeholder="标称重量 (kg)" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <div className="grid gap-3 sm:grid-cols-3 text-sm text-stone-700">
          <label className="flex items-center gap-2 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3"><input type="checkbox" checked={isDisc} onChange={(e) => setIsDisc(e.target.checked)} /> 碟刹</label>
          <label className="flex items-center gap-2 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3"><input type="checkbox" checked={isElectronicShifting} onChange={(e) => setIsElectronicShifting(e.target.checked)} /> 电子变速</label>
          <label className="flex items-center gap-2 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3"><input type="checkbox" checked={isStockCompleteBike} onChange={(e) => setIsStockCompleteBike(e.target.checked)} /> 整车在售</label>
        </div>
        <input value={officialBuildUrl} onChange={(e) => setOfficialBuildUrl(e.target.value)} placeholder="官方配置链接" className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="备注" className="min-h-[120px] rounded-[1.2rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--accent)]" />
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:opacity-60">
          {loading ? "保存中..." : "保存配置信息"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
    </section>
  );
}
