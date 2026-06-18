// ============================================================================
// ドメイン型定義
// 将来 API 連携する際は、この型を満たす形でデータを返せばUIはそのまま動く。
// （データの取得元 = src/lib/data.ts の DataProvider を差し替えるだけ）
// ============================================================================

/** 資産クラス */
export type AssetClass = "crypto" | "stock";

/** 売買方向 */
export type Side = "BUY" | "SELL";

/** 時系列の1点（チャート用） */
export interface PricePoint {
  /** ラベル（時刻 or 日付） */
  label: string;
  /** 値 */
  value: number;
}

/** 保有銘柄 */
export interface Holding {
  id: string;
  /** ティッカー（例: BTC, 7203） */
  symbol: string;
  /** 銘柄名 */
  name: string;
  assetClass: AssetClass;
  /** 保有数量 */
  quantity: number;
  /** 平均取得単価 */
  avgPrice: number;
  /** 現在値 */
  price: number;
  /** 評価額（JPY換算） */
  value: number;
  /** 24h / 当日 騰落率（%） */
  change: number;
  /** ポートフォリオ内構成比（%） */
  allocation: number;
  /** スパークライン用の直近推移 */
  spark: number[];
}

/** 約定履歴 */
export interface Trade {
  id: string;
  time: string;
  symbol: string;
  assetClass: AssetClass;
  side: Side;
  price: number;
  quantity: number;
}

/** ウォッチリスト1件 */
export interface WatchItem {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  change: number;
  spark: number[];
}

/** サマリーカード1枚分のKPI */
export interface Kpi {
  /** 直近トレンド（スパークライン） */
  spark: number[];
  /** 現在値（整形前の数値） */
  value: number;
  /** 前日比などの変化率（%） */
  change: number;
}

/** ダッシュボード全体のスナップショット */
export interface PortfolioSnapshot {
  /** 総資産 */
  totalBalance: Kpi;
  /** 当日損益 */
  todayPnl: Kpi;
  /** 評価損益（含み） */
  unrealizedPnl: Kpi;
  /** 勝率 */
  winRate: Kpi;
  /** メインチャート（総資産推移） */
  equityCurve: PricePoint[];
  holdings: Holding[];
  trades: Trade[];
  watchlist: WatchItem[];
}
