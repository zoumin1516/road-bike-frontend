"use client";

import { useState } from "react";

import { getAdminApiBaseUrl, loginAdmin } from "@/lib/api/admin";

export function AdminLoginPanel({
  onLoggedIn,
  currentUsername,
  onLogout,
}: {
  onLoggedIn: () => Promise<void> | void;
  currentUsername: string | null;
  onLogout: () => void;
}) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  async function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setClickCount((count) => count + 1);
    setLoading(true);
    setMessage("正在发起登录请求...");

    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem("rb_admin_token", data.access_token);
      await onLoggedIn();
      setPassword("");
      setMessage("登录成功，令牌已保存并通过校验。现在可以继续使用后台编辑功能。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "登录失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[1.8rem] border border-[color:var(--line)] bg-[rgba(255,251,246,0.88)] p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="text-data-meta text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Admin Login</p>
      <h2 className="text-data-heading mt-2 text-[1.5rem] leading-none text-stone-900">后台登录</h2>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">登录后将在当前浏览器保存 JWT，用于调用受保护的后台编辑接口。</p>
      <div className="mt-3 rounded-xl border border-[color:var(--line)] bg-stone-50 px-4 py-3 text-[11px] leading-5 text-stone-600">
        当前 API 地址：<span className="font-medium text-stone-900">{getAdminApiBaseUrl()}</span>
        <br />
        调试点击计数：<span className="font-medium text-stone-900">{clickCount}</span>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Session</p>
          <p className="mt-1 text-sm text-stone-800">{currentUsername ? `当前已登录：${currentUsername}` : "当前未登录"}</p>
        </div>
        {currentUsername ? (
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
          >
            退出登录
          </button>
        ) : null}
      </div>

      <form
        className="mt-5 grid gap-3"
        onSubmit={handleSubmit}
      >
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="用户名"
          disabled={loading}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-stone-900 disabled:bg-stone-50 disabled:text-stone-400"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="密码"
          disabled={loading}
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-stone-900 disabled:bg-stone-50 disabled:text-stone-400"
        />
        <button
          type="button"
          onMouseDown={() => setMessage((current) => current || "按钮事件已触发，准备登录...")}
          onClick={() => void handleSubmit()}
          disabled={loading}
          className="inline-flex h-11 cursor-pointer items-center justify-center rounded-2xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "登录中..." : "登录后台"}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${
            message.includes("成功")
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
