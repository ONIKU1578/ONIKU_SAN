"use client";

import { useState } from "react";
import AreaChart from "@/components/charts/AreaChart";
import { jpy, pct, trendClass } from "@/lib/format";
import type { PricePoint } from "@/lib/types";

const RANGES = ["1D", "1W", "1M", "3M", "1Y", "全期間"];

interface Props {
  data: PricePoint[];
  total: number;
  change: number;
}

export default function MainChartCard({ data, total, change }: Props) {
  const [range, setRange] = useState("1D");

  return (
    <div className="glass p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xs font-bold text-white">
              Σ
            </span>
            総資産推移
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="tabular text-3xl font-bold text-white glow-accent">{jpy(total)}</span>
            <span className={`tabular text-sm font-semibold ${trendClass(change)}`}>
              {pct(change)}
            </span>
          </div>
        </div>

        {/* 時間足 */}
        <div className="flex rounded-lg border border-[var(--border)] bg-white/[0.02] p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                range === r
                  ? "bg-[var(--accent)]/20 text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <AreaChart data={data} height={300} />
      </div>
    </div>
  );
}
