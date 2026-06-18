// ポートフォリオ構成比のドーナツ（依存ゼロ・SVG）
interface Segment {
  label: string;
  value: number;
  color: string;
}

interface Props {
  segments: Segment[];
  size?: number;
  thickness?: number;
}

export default function DonutChart({ segments, size = 180, thickness = 20 }: Props) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* トラック */}
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(148,163,255,0.07)" strokeWidth={thickness} />
      {segments.map((seg) => {
        const frac = seg.value / total;
        const dash = frac * circ;
        const el = (
          <circle
            key={seg.label}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${c} ${c})`}
            style={{ filter: "drop-shadow(0 0 6px rgba(124,92,255,0.25))" }}
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}
