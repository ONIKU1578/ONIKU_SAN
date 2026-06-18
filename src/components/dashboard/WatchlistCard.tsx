import Sparkline from "@/components/charts/Sparkline";
import { num, pct, trendClass } from "@/lib/format";
import { IconPlus } from "@/components/Icon";
import type { WatchItem } from "@/lib/types";

export default function WatchlistCard({ items }: { items: WatchItem[] }) {
  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">ウォッチリスト</h3>
        <button className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:text-white">
          <IconPlus size={15} />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        {items.map((w) => (
          <div
            key={w.symbol}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/[0.03]"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{w.symbol}</div>
              <div className="truncate text-xs text-[var(--muted)]">{w.name}</div>
            </div>
            <div className="ml-auto">
              <Sparkline data={w.spark} width={56} height={24} fill={false} />
            </div>
            <div className="w-20 text-right">
              <div className="tabular text-sm text-white">{num(w.price, 1)}</div>
              <div className={`tabular text-xs font-semibold ${trendClass(w.change)}`}>
                {pct(w.change)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
