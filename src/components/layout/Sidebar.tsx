"use client";

import { useState } from "react";
import {
  IconGrid,
  IconCoins,
  IconWallet,
  IconList,
  IconChart,
  IconFlask,
  IconSettings,
  IconSparkle,
} from "@/components/Icon";

const NAV = [
  { id: "dashboard", label: "ダッシュボード", Icon: IconGrid },
  { id: "crypto", label: "暗号資産", Icon: IconCoins },
  { id: "portfolio", label: "ポートフォリオ", Icon: IconWallet },
  { id: "trades", label: "取引履歴", Icon: IconList },
  { id: "analytics", label: "分析", Icon: IconChart },
  { id: "lab", label: "ストラテジー", Icon: IconFlask },
  { id: "settings", label: "設定", Icon: IconSettings },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-[var(--border)] bg-[var(--bg-soft)]/60 p-5 lg:flex">
      {/* ロゴ */}
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_20px_rgba(124,92,255,0.5)]">
          <span className="text-lg font-black text-white">A</span>
        </div>
        <span className="text-lg font-bold tracking-[0.18em] text-white">AURORA</span>
      </div>

      {/* ナビ */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`nav-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                isActive
                  ? "nav-item-active"
                  : "text-[var(--muted)] hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Proカード */}
      <div className="mt-auto rounded-2xl border border-[var(--border-strong)] bg-gradient-to-b from-[rgba(124,92,255,0.16)] to-transparent p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <IconSparkle size={16} className="text-[var(--accent-2)]" />
          API連携を有効化
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
          取引所・証券口座をつなげて、リアルタイムの資産を自動同期。
        </p>
        <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] py-2 text-xs font-bold text-white shadow-[0_8px_24px_-8px_rgba(124,92,255,0.8)] transition hover:brightness-110">
          連携を設定
        </button>
      </div>

      {/* システム状態 */}
      <div className="flex items-center gap-2 px-2 text-xs text-[var(--muted)]">
        <span className="h-2 w-2 rounded-full bg-[var(--up)] badge-live" />
        全システム正常 · v0.1.0
      </div>
    </aside>
  );
}
