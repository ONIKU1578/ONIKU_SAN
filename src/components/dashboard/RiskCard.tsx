import { IconShield } from "@/components/Icon";
import { jpy } from "@/lib/format";

interface Props {
  dailyLimit: number;
  used: number;
}

export default function RiskCard({ dailyLimit, used }: Props) {
  const ratio = Math.min(100, Math.round((used / dailyLimit) * 100));

  const metrics = [
    { label: "最大ドローダウン", value: "-8.42%", tone: "text-[var(--down)]" },
    { label: "シャープレシオ", value: "2.34", tone: "text-white" },
    { label: "プロフィットファクター", value: "1.85", tone: "text-white" },
  ];

  return (
    <div className="glass glass-hover p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconShield size={16} className="text-[var(--accent-2)]" />
          <h3 className="text-sm font-semibold text-white">リスク管理</h3>
        </div>
        <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
          中
        </span>
      </div>

      {/* 当日損失上限ゲージ */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--muted)]">当日損失上限</span>
          <span className="tabular text-white">{jpy(dailyLimit)}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
            style={{ width: `${ratio}%` }}
          />
        </div>
        <div className="mt-1.5 text-xs text-[var(--muted)] tabular">
          使用 {jpy(used)}（{ratio}%）
        </div>
      </div>

      {/* 指標 */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[10px] leading-tight text-[var(--muted)]">{m.label}</div>
            <div className={`tabular mt-1 text-sm font-bold ${m.tone}`}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
