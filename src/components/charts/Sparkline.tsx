// 軽量スパークライン（依存ゼロ・SVG）
interface Props {
  data: number[];
  width?: number;
  height?: number;
  /** 線の色（CSS color）。省略時は騰落で自動判定。 */
  color?: string;
  /** 面の塗りを出すか */
  fill?: boolean;
  strokeWidth?: number;
}

export default function Sparkline({
  data,
  width = 120,
  height = 36,
  color,
  fill = true,
  strokeWidth = 1.75,
}: Props) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const w = width;
  const h = height;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - pad * 2) + pad;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(2)},${h} L${points[0][0].toFixed(2)},${h} Z`;

  const trendUp = data[data.length - 1] >= data[0];
  const stroke = color ?? (trendUp ? "var(--up)" : "var(--down)");
  const gid = `spark-${Math.round(points[0][1] * 1000)}-${data.length}-${Math.round(min)}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
