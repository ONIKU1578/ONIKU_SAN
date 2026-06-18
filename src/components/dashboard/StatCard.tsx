import Sparkline from "@/components/charts/Sparkline";
import { pct, trendClass } from "@/lib/format";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  change: number;
  spark: number[];
  icon: ReactNode;
  /** スパークラインの色を固定したい場合 */
  sparkColor?: string;
}

export default function StatCard({ label, value, change, spark, icon, sparkColor }: Props) {
  return (
    <div className="glass glass-hover p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {label}
        </span>
        <span className="text-[var(--muted)]">{icon}</span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <div className="tabular text-2xl font-bold text-white">{value}</div>
          <div className={`mt-1 text-xs font-semibold tabular ${trendClass(change)}`}>
            {pct(change)}
          </div>
        </div>
        <Sparkline data={spark} width={104} height={40} color={sparkColor} />
      </div>
    </div>
  );
}
