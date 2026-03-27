"use client";

import { useMemo } from "react";

type SelectedRecord = {
  type: "brand" | "model" | "build" | "component";
  id: string;
  title: string;
  imageUrl?: string | null;
  subtitle?: string | null;
  meta?: string | null;
};

export function EntityEditorPanel({ selectedRecord }: { selectedRecord?: SelectedRecord | null }) {
  const fieldHints = useMemo(() => {
    if (!selectedRecord) return [];

    if (selectedRecord.type === "brand") {
      return ["品牌英文名", "品牌中文名", "国家/地区", "市场定位", "官网地址"];
    }
    if (selectedRecord.type === "model") {
      return ["车型名称", "系列名称", "车型类别", "车架材质", "刹车类型"];
    }
    if (selectedRecord.type === "build") {
      return ["配置名称", "年份", "套件品牌", "轮组品牌", "价格"];
    }
    return ["零部件名称", "品牌", "分类", "系列", "价格"];
  }, [selectedRecord]);

  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Entity Editor</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">实体信息编辑</h2>

      {selectedRecord ? (
        <>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            当前已选中 <span className="font-semibold text-stone-900">{selectedRecord.title}</span>。下面是下一步准备接入的结构化编辑字段骨架。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {fieldHints.map((field) => (
              <div key={field} className="rounded-[1.2rem] border border-[color:var(--line)] bg-white/78 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Field</p>
                <p className="mt-2 text-sm font-medium text-stone-900">{field}</p>
                <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">下一步可在这里接入真正的编辑表单与保存接口。</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">先从左侧选中一条记录，再继续做结构化字段编辑。</p>
      )}
    </section>
  );
}
