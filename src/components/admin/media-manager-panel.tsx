"use client";

import { useEffect, useMemo, useState } from "react";

import {
  updateBrandMedia,
  updateBuildMedia,
  updateComponentMedia,
  updateModelMedia,
} from "@/lib/api/admin";

const entityOptions = [
  { value: "brand", label: "品牌" },
  { value: "model", label: "车型" },
  { value: "build", label: "配置" },
  { value: "component", label: "零部件" },
] as const;

export function MediaManagerPanel({
  selectedRecord,
  onSaved,
}: {
  selectedRecord?: { type: (typeof entityOptions)[number]["value"]; id: string; title: string; imageUrl?: string | null } | null;
  onSaved?: (payload: { type: (typeof entityOptions)[number]["value"]; id: string; imageUrl?: string | null }) => void;
}) {
  const [entityType, setEntityType] = useState<(typeof entityOptions)[number]["value"]>("brand");
  const [entityId, setEntityId] = useState("");
  const [primaryUrl, setPrimaryUrl] = useState("");
  const [heroUrl, setHeroUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const primaryLabel = useMemo(() => (entityType === "brand" ? "Logo URL" : "Image URL"), [entityType]);

  useEffect(() => {
    if (!selectedRecord) return;
    setEntityType(selectedRecord.type);
    setEntityId(selectedRecord.id);
    setPrimaryUrl(selectedRecord.imageUrl || "");
    setHeroUrl("");
    setMessage(`已选中 ${selectedRecord.title}，可以继续修改图片地址。`);
  }, [selectedRecord]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem("rb_admin_token");
    if (!token) {
      setMessage("请先登录后台，浏览器里还没有可用 token。");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      if (entityType === "brand") {
        const result = await updateBrandMedia(token, entityId, {
          logo_url: primaryUrl || undefined,
          hero_image_url: heroUrl || undefined,
        });
        onSaved?.({ type: entityType, id: entityId, imageUrl: primaryUrl || null });
        setMessage(result.message);
      } else if (entityType === "model") {
        const result = await updateModelMedia(token, entityId, {
          image_url: primaryUrl || undefined,
          hero_image_url: heroUrl || undefined,
        });
        onSaved?.({ type: entityType, id: entityId, imageUrl: primaryUrl || null });
        setMessage(result.message);
      } else if (entityType === "build") {
        const result = await updateBuildMedia(token, entityId, {
          image_url: primaryUrl || undefined,
          hero_image_url: heroUrl || undefined,
        });
        onSaved?.({ type: entityType, id: entityId, imageUrl: primaryUrl || null });
        setMessage(result.message);
      } else {
        const result = await updateComponentMedia(token, entityId, {
          image_url: primaryUrl || undefined,
          hero_image_url: heroUrl || undefined,
        });
        onSaved?.({ type: entityType, id: entityId, imageUrl: primaryUrl || null });
        setMessage(result.message);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Media Manager</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">图片地址管理</h2>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">更新品牌 logo、车型图、配置图或零部件图，接口已受 JWT 保护。</p>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <select
          value={entityType}
          onChange={(event) => setEntityType(event.target.value as (typeof entityOptions)[number]["value"])}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        >
          {entityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          value={entityId}
          onChange={(event) => setEntityId(event.target.value)}
          placeholder="输入目标 ID，例如 canyon / aeroad-cfr"
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        <input
          value={primaryUrl}
          onChange={(event) => setPrimaryUrl(event.target.value)}
          placeholder={primaryLabel}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        <input
          value={heroUrl}
          onChange={(event) => setHeroUrl(event.target.value)}
          placeholder="Hero Image URL（可选）"
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:opacity-60"
        >
          {loading ? "保存中..." : "保存媒体地址"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
    </section>
  );
}
