"use client";

import { useState } from "react";

import { loginAdmin } from "@/lib/api/admin";

export function AdminLoginPanel({
  onLoggedIn,
  currentUsername,
  onLogout,
}: {
  onLoggedIn: (username: string) => void;
  currentUsername: string | null;
  onLogout: () => void;
}) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem("rb_admin_token", data.access_token);
      onLoggedIn(username);
      setMessage("登录成功，令牌已保存到本地浏览器。现在可以在下方管理图片地址。");
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
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">登录后将在当前浏览器保存 JWT，用于调用受保护的媒体管理接口。</p>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">Session</p>
          <p className="mt-1 text-sm text-stone-800">{currentUsername ? `当前已登录：${currentUsername}` : "当前未登录"}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          退出登录
        </button>
      </div>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="用户名"
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="密码"
          className="h-11 rounded-2xl border border-[color:var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:opacity-60"
        >
          {loading ? "登录中..." : "登录后台"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-stone-700">{message}</p> : null}
    </section>
  );
}
