"use client";

import { useState } from "react";
import Sparkline from "@/components/charts/Sparkline";
import { jpy, num, pct, trendClass } from "@/lib/format";
import type { AssetClass, Holding } from "@/lib/types";

const TABS: { id: AssetClass | "all"; label: string }[] = [
  { id: "all", label: "すべて" },
  { id: "crypto", label: "暗号資産" },
  { id: "stock", label: "株式" },
];

export default function HoldingsCard({ holdings }: { holdings: Holding[] }) {
  const [tab, setTab] = useState<AssetClass | "all">("all");
  const rows = tab === "all" ? holdings : holdings.filter((h) => h.assetClass === tab);

  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">保有銘柄</h3>
        <div className="flex rounded-lg border border-[var(--border)] bg-white/[0.02] p-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                tab === t.id
                  ? "bg-[var(--accent)]/20 text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-[var(--muted)]">
              <th className="pb-2 font-medium">銘柄</th>
              <th className="pb-2 text-right font-medium">数量</th>
              <th className="pb-2 text-right font-medium">現在値</th>
              <th className="pb-2 text-right font-medium">評価額</th>
              <th className="pb-2 text-right font-medium">24h</th>
              <th className="pb-2 pl-4 text-right font-medium">推移</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((h) => (
              <tr
                key={h.id}
                className="border-t border-[var(--border)] transition hover:bg-white/[0.02]"
              >
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                        h.assetClass === "crypto"
                          ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                          : "bg-[var(--accent-2)]/15 text-[var(--accent-2)]"
                      }`}
                    >
                      {h.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <div className="font-semibold text-white">{h.symbol}</div>
                      <div className="text-xs text-[var(--muted)]">{h.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right tabular text-[var(--muted)]">{num(h.quantity)}</td>
                <td className="py-3 text-right tabular text-white">{jpy(h.price)}</td>
                <td className="py-3 text-right tabular font-medium text-white">
                  {jpy(h.value, { compact: true })}
                </td>
                <td className={`py-3 text-right tabular font-semibold ${trendClass(h.change)}`}>
                  {pct(h.change)}
                </td>
                <td className="py-3 pl-4">
                  <div className="flex justify-end">
                    <Sparkline data={h.spark} width={80} height={28} fill={false} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
