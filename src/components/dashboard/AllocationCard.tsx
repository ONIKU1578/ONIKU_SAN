import DonutChart from "@/components/charts/DonutChart";
import { jpy } from "@/lib/format";
import type { Holding } from "@/lib/types";

const PALETTE = ["#7c5cff", "#22d3ee", "#34d399", "#f59e0b", "#fb7185", "#a78bfa", "#38bdf8"];

interface Props {
  holdings: Holding[];
  total: number;
}

export default function AllocationCard({ holdings, total }: Props) {
  const segments = holdings.map((h, i) => ({
    label: h.symbol,
    value: h.value,
    color: PALETTE[i % PALETTE.length],
  }));

  return (
    <div className="glass glass-hover p-5">
      <h3 className="text-sm font-semibold text-white">資産配分</h3>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative shrink-0">
          <DonutChart segments={segments} size={150} thickness={18} />
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Total</div>
              <div className="tabular text-sm font-bold text-white">
                {jpy(total, { compact: true })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {holdings.slice(0, 5).map((h, i) => (
            <div key={h.id} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              <span className="font-medium text-white">{h.symbol}</span>
              <span className="ml-auto tabular text-[var(--muted)]">{h.allocation}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
