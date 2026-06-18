// 表示用フォーマッタ群

/** 円表記（¥1,234,567）。小数は四捨五入。 */
export function jpy(value: number, opts?: { compact?: boolean }): string {
  if (opts?.compact && Math.abs(value) >= 10000) {
    return "¥" + compactJa(value);
  }
  return "¥" + Math.round(value).toLocaleString("ja-JP");
}

/** 数値をそのまま桁区切り（小数桁は maxFrac まで） */
export function num(value: number, maxFrac = 4): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFrac,
  });
}

/** 騰落率（+2.45% / -1.20%）。符号付き。 */
export function pct(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/** 符号付き円（+¥234,567 / -¥12,345） */
export function signedJpy(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}¥${Math.round(Math.abs(value)).toLocaleString("ja-JP")}`;
}

/** 日本式の万/億 簡易表記 */
function compactJa(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_0000_0000) return `${sign}${(abs / 1_0000_0000).toFixed(2)}億`;
  if (abs >= 1_0000) return `${sign}${(abs / 1_0000).toFixed(1)}万`;
  return `${sign}${Math.round(abs).toLocaleString("ja-JP")}`;
}

/** 値の正負で配色クラスを返す（緑=プラス / 赤=マイナス） */
export function trendClass(value: number): string {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-rose-400";
  return "text-slate-400";
}
