"use client";

import { useMemo, useState } from "react";
import type { PricePoint } from "@/lib/types";
import { jpy } from "@/lib/format";

interface Props {
  data: PricePoint[];
  height?: number;
}

const VIEW_W = 1000;

/** 総資産推移などを描くメインのエリアチャート（ホバーで十字線＋ツールチップ） */
export default function AreaChart({ data, height = 300 }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const { line, area, points, min, max } = useMemo(() => {
    const vals = data.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const padY = 16;
    const pts = data.map((d, i) => {
      const x = (i / (data.length - 1)) * VIEW_W;
      const y = padY + (1 - (d.value - min) / range) * (height - padY * 2);
      return [x, y] as const;
    });
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const area = `${line} L${VIEW_W},${height} L0,${height} Z`;
    return { line, area, points: pts, min, max };
  }, [data, height]);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(ratio * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const hp = hover !== null ? points[hover] : null;

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {/* 水平グリッド */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2={VIEW_W}
            y1={height * g}
            y2={height * g}
            stroke="rgba(148,163,255,0.06)"
            strokeWidth="1"
          />
        ))}

        <path d={area} fill="url(#area-fill)" />
        <path
          d={line}
          fill="none"
          stroke="url(#line-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ホバー時の十字線とドット */}
        {hp && (
          <g>
            <line
              x1={hp[0]}
              x2={hp[0]}
              y1="0"
              y2={height}
              stroke="rgba(148,163,255,0.25)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={hp[0]} cy={hp[1]} r="5" fill="var(--accent-2)" />
            <circle cx={hp[0]} cy={hp[1]} r="9" fill="var(--accent-2)" opacity="0.25" />
          </g>
        )}
      </svg>

      {/* ツールチップ */}
      {hover !== null && hp && (
        <div
          className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-lg border border-[var(--border-strong)] bg-[#0b0d18]/95 px-3 py-2 text-xs shadow-xl"
          style={{ left: `${(hp[0] / VIEW_W) * 100}%` }}
        >
          <div className="text-[var(--muted)]">{data[hover].label}</div>
          <div className="tabular mt-0.5 font-semibold text-white">
            {jpy(data[hover].value)}
          </div>
        </div>
      )}

      {/* レンジラベル */}
      <div className="pointer-events-none absolute right-0 top-2 text-[10px] text-[var(--muted)] tabular">
        {jpy(max, { compact: true })}
      </div>
      <div className="pointer-events-none absolute bottom-1 right-0 text-[10px] text-[var(--muted)] tabular">
        {jpy(min, { compact: true })}
      </div>
    </div>
  );
}
