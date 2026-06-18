import type {
  Holding,
  PortfolioSnapshot,
  PricePoint,
  Trade,
  WatchItem,
} from "./types";

// ============================================================================
// データ層
//
// 今はモック（決定論的に生成）。将来は MockProvider を
// 取引所/証券のAPIクライアントに差し替えるだけで、UIはそのまま動く。
//
//   export interface DataProvider { getSnapshot(): Promise<PortfolioSnapshot> }
//
// 例) BinanceProvider, RakutenSecProvider などを実装して provider を差し替える。
// ============================================================================

export interface DataProvider {
  getSnapshot(): Promise<PortfolioSnapshot> | PortfolioSnapshot;
}

// --- 決定論的乱数（SSRとCSRで値を一致させ、hydration mismatch を防ぐ） -------
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** ランダムウォークで値動きを生成 */
function walk(seed: number, length: number, start: number, vol: number): number[] {
  const rng = mulberry32(seed);
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < length; i++) {
    v = Math.max(start * 0.55, v * (1 + (rng() - 0.47) * vol));
    out.push(Number(v.toFixed(2)));
  }
  return out;
}

// --- モック保有銘柄 ----------------------------------------------------------
const RAW_HOLDINGS: Array<
  Omit<Holding, "value" | "allocation" | "spark"> & { seed: number; vol: number }
> = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", assetClass: "crypto", quantity: 0.742, avgPrice: 8_900_000, price: 10_184_000, change: 1.82, seed: 11, vol: 0.04 },
  { id: "eth", symbol: "ETH", name: "Ethereum", assetClass: "crypto", quantity: 5.4, avgPrice: 480_000, price: 562_300, change: 2.61, seed: 22, vol: 0.05 },
  { id: "sol", symbol: "SOL", name: "Solana", assetClass: "crypto", quantity: 120, avgPrice: 18_400, price: 23_980, change: -1.34, seed: 33, vol: 0.07 },
  { id: "7203", symbol: "7203", name: "トヨタ自動車", assetClass: "stock", quantity: 300, avgPrice: 2_810, price: 3_124, change: 0.92, seed: 44, vol: 0.02 },
  { id: "6758", symbol: "6758", name: "ソニーG", assetClass: "stock", quantity: 80, avgPrice: 12_300, price: 13_410, change: 1.45, seed: 55, vol: 0.025 },
  { id: "aapl", symbol: "AAPL", name: "Apple Inc.", assetClass: "stock", quantity: 60, avgPrice: 26_100, price: 28_740, change: -0.58, seed: 66, vol: 0.03 },
  { id: "nvda", symbol: "NVDA", name: "NVIDIA", assetClass: "stock", quantity: 40, avgPrice: 14_800, price: 19_260, change: 3.21, seed: 77, vol: 0.045 },
];

function buildHoldings(): Holding[] {
  const enriched = RAW_HOLDINGS.map((h) => ({
    ...h,
    value: h.quantity * h.price,
    spark: walk(h.seed, 24, h.price, h.vol),
  }));
  const total = enriched.reduce((s, h) => s + h.value, 0);
  return enriched.map((h) => ({
    ...h,
    allocation: Number(((h.value / total) * 100).toFixed(1)),
  }));
}

// --- モック約定履歴 ----------------------------------------------------------
const TRADES: Trade[] = [
  { id: "t1", time: "10:30:45", symbol: "BTC", assetClass: "crypto", side: "BUY", price: 10_184_000, quantity: 0.0234 },
  { id: "t2", time: "10:30:21", symbol: "ETH", assetClass: "crypto", side: "SELL", price: 562_300, quantity: 1.234 },
  { id: "t3", time: "10:29:56", symbol: "NVDA", assetClass: "stock", side: "BUY", price: 19_260, quantity: 12 },
  { id: "t4", time: "10:29:33", symbol: "7203", assetClass: "stock", side: "BUY", price: 3_124, quantity: 100 },
  { id: "t5", time: "10:28:47", symbol: "SOL", assetClass: "crypto", side: "SELL", price: 23_980, quantity: 18 },
  { id: "t6", time: "10:27:12", symbol: "AAPL", assetClass: "stock", side: "BUY", price: 28_740, quantity: 8 },
];

// --- モックウォッチリスト ----------------------------------------------------
const WATCHLIST: WatchItem[] = [
  { symbol: "XRP", name: "Ripple", assetClass: "crypto", price: 82.4, change: 4.12, spark: walk(91, 20, 82, 0.05) },
  { symbol: "6861", name: "キーエンス", assetClass: "stock", price: 71_200, change: -0.84, spark: walk(92, 20, 71200, 0.02) },
  { symbol: "MSFT", name: "Microsoft", assetClass: "stock", price: 62_300, change: 1.07, spark: walk(93, 20, 62300, 0.025) },
  { symbol: "DOGE", name: "Dogecoin", assetClass: "crypto", price: 24.6, change: 6.73, spark: walk(94, 20, 24, 0.08) },
];

// --- 総資産推移（メインチャート） --------------------------------------------
function buildEquityCurve(): PricePoint[] {
  const series = walk(2024, 48, 11_800_000, 0.012);
  return series.map((value, i) => ({
    label: `${String(Math.floor(i / 2) % 24).padStart(2, "0")}:00`,
    value,
  }));
}

// --- モックプロバイダ --------------------------------------------------------
export const MockProvider: DataProvider = {
  getSnapshot(): PortfolioSnapshot {
    const holdings = buildHoldings();
    const totalBalance = holdings.reduce((s, h) => s + h.value, 0);
    const todayPnl = holdings.reduce(
      (s, h) => s + (h.value * h.change) / 100,
      0,
    );
    const unrealizedPnl = holdings.reduce(
      (s, h) => s + (h.price - h.avgPrice) * h.quantity,
      0,
    );

    return {
      totalBalance: { value: totalBalance, change: 2.45, spark: walk(1, 24, totalBalance, 0.01) },
      todayPnl: { value: todayPnl, change: 1.92, spark: walk(2, 24, Math.abs(todayPnl), 0.06) },
      unrealizedPnl: { value: unrealizedPnl, change: 3.81, spark: walk(3, 24, Math.abs(unrealizedPnl), 0.04) },
      winRate: { value: 68.4, change: 2.14, spark: walk(4, 24, 68, 0.02) },
      equityCurve: buildEquityCurve(),
      holdings,
      trades: TRADES,
      watchlist: WATCHLIST,
    };
  },
};

/** 現在のアクティブなデータプロバイダ（ここを差し替えれば本番APIに繋がる） */
export const provider: DataProvider = MockProvider;
