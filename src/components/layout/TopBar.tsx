"use client";

import { IconSearch, IconBell } from "@/components/Icon";

export default function TopBar() {
  return (
    <header className="flex flex-col gap-4 px-6 pt-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-xl font-bold text-white md:text-2xl">
          おかえりなさい、<span className="text-gradient">Trader</span>
        </h1>
        <p className="mt-0.5 text-sm text-[var(--muted)]">
          今日のあなたの資産状況です。
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* マーケット状態 */}
        <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.02] px-3 py-1.5 text-xs sm:flex">
          <span className="h-2 w-2 rounded-full bg-[var(--up)] badge-live" />
          <span className="font-medium text-white">マーケット稼働中</span>
          <span className="tabular text-[var(--muted)]">2026/06/18 · 10:30 JST</span>
        </div>

        {/* 検索 */}
        <button className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-white/[0.02] text-[var(--muted)] transition hover:text-white">
          <IconSearch size={18} />
        </button>

        {/* 通知 */}
        <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-white/[0.02] text-[var(--muted)] transition hover:text-white">
          <IconBell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent-2)]" />
        </button>

        {/* ユーザー */}
        <button className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-white/[0.02] py-1.5 pl-1.5 pr-3 transition hover:border-[var(--border-strong)]">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xs font-bold text-white">
            TK
          </span>
          <span className="hidden text-sm font-medium text-white sm:block">Trader K.</span>
        </button>
      </div>
    </header>
  );
}
