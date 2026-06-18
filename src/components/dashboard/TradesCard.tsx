import { jpy, num } from "@/lib/format";
import type { Trade } from "@/lib/types";

export default function TradesCard({ trades }: { trades: Trade[] }) {
  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">最近の取引</h3>
        <button className="text-xs font-medium text-[var(--accent-2)] hover:underline">
          すべて表示
        </button>
      </div>

      <div className="mt-3 divide-y divide-[var(--border)]">
        {trades.map((t) => (
          <div key={t.id} className="flex items-center gap-3 py-2.5 text-sm">
            <span className="tabular w-16 text-xs text-[var(--muted)]">{t.time}</span>
            <span className="font-semibold text-white">{t.symbol}</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                t.side === "BUY"
                  ? "bg-[var(--up)]/15 text-[var(--up)]"
                  : "bg-[var(--down)]/15 text-[var(--down)]"
              }`}
            >
              {t.side}
            </span>
            <span className="tabular ml-auto text-white">{jpy(t.price)}</span>
            <span className="tabular w-20 text-right text-xs text-[var(--muted)]">
              {num(t.quantity)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
