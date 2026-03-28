"use client";

import { useEffect, useState } from "react";

import { AdminLoginPanel } from "@/components/admin/admin-login-panel";
import { BrandEditorForm } from "@/components/admin/brand-editor-form";
import { BuildEditorForm } from "@/components/admin/build-editor-form";
import { ComponentEditorForm } from "@/components/admin/component-editor-form";
import { EntityEditorPanel } from "@/components/admin/entity-editor-panel";
import { ModelEditorForm } from "@/components/admin/model-editor-form";
import { AdminRecordBrowser } from "@/components/admin/admin-record-browser";
import { AdminRecordPreview } from "@/components/admin/admin-record-preview";
import { MediaManagerPanel } from "@/components/admin/media-manager-panel";
import { getCurrentAdmin } from "@/lib/api/admin";

type SelectedRecord = {
  type: "brand" | "model" | "build" | "component";
  id: string;
  title: string;
  imageUrl?: string | null;
  subtitle?: string | null;
  meta?: string | null;
  facts?: string[];
};

type SavedRecordPayload = {
  type: SelectedRecord["type"];
  id: string;
  title: string;
  subtitle?: string | null;
  meta?: string | null;
  imageUrl?: string | null;
  facts?: string[];
};

export function AdminWorkspace() {
  const [selectedRecord, setSelectedRecord] = useState<SelectedRecord | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("rb_admin_token");
    if (!token) return;

    getCurrentAdmin(token)
      .then((data) => setCurrentUsername(data.username))
      .catch(() => {
        localStorage.removeItem("rb_admin_token");
        setCurrentUsername(null);
      });
  }, []);

  async function handleLoggedIn() {
    const token = localStorage.getItem("rb_admin_token");
    if (!token) {
      setCurrentUsername(null);
      return;
    }

    try {
      const data = await getCurrentAdmin(token);
      setCurrentUsername(data.username);
    } catch {
      localStorage.removeItem("rb_admin_token");
      setCurrentUsername(null);
      throw new Error("登录成功但令牌校验失败，请检查后端服务和鉴权配置。");
    }
  }

  function handleLogout() {
    localStorage.removeItem("rb_admin_token");
    setCurrentUsername(null);
  }

  function handleEntitySaved(payload: SavedRecordPayload) {
    setSelectedRecord((current) => {
      if (!current || current.id !== payload.id || current.type !== payload.type) return current;
      return {
        ...current,
        title: payload.title,
        subtitle: payload.subtitle,
        meta: payload.meta,
        imageUrl: payload.imageUrl,
        facts: payload.facts,
      };
    });
    setRefreshKey((value) => value + 1);
  }

  function handleMediaSaved(payload: { type: SelectedRecord["type"]; id: string; imageUrl?: string | null }) {
    setSelectedRecord((current) => {
      if (!current || current.id !== payload.id || current.type !== payload.type) return current;
      return {
        ...current,
        imageUrl: payload.imageUrl,
      };
    });
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-6">
        <AdminLoginPanel
          onLoggedIn={handleLoggedIn}
          currentUsername={currentUsername}
          onLogout={handleLogout}
        />
        <AdminRecordBrowser
          onSelect={setSelectedRecord}
          activeRecordId={selectedRecord?.id}
          refreshKey={refreshKey}
        />
      </div>
      <div className="grid gap-6">
        <AdminRecordPreview record={selectedRecord} />
        {selectedRecord?.type === "brand" ? <BrandEditorForm selectedRecord={selectedRecord} onSaved={handleEntitySaved} /> : null}
        {selectedRecord?.type === "model" ? <ModelEditorForm selectedRecord={selectedRecord} onSaved={handleEntitySaved} /> : null}
        {selectedRecord?.type === "build" ? <BuildEditorForm selectedRecord={selectedRecord} onSaved={handleEntitySaved} /> : null}
        {selectedRecord?.type === "component" ? <ComponentEditorForm selectedRecord={selectedRecord} onSaved={handleEntitySaved} /> : null}
        <EntityEditorPanel selectedRecord={selectedRecord} />
        <MediaManagerPanel selectedRecord={selectedRecord} onSaved={handleMediaSaved} />
      </div>
    </div>
  );
}
