import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/dashboard/StatCard";
import MainChartCard from "@/components/dashboard/MainChartCard";
import AllocationCard from "@/components/dashboard/AllocationCard";
import HoldingsCard from "@/components/dashboard/HoldingsCard";
import TradesCard from "@/components/dashboard/TradesCard";
import WatchlistCard from "@/components/dashboard/WatchlistCard";
import RiskCard from "@/components/dashboard/RiskCard";
import { provider } from "@/lib/data";
import { jpy, signedJpy } from "@/lib/format";
import { IconWallet, IconChart, IconArrowUpRight, IconBot } from "@/components/Icon";

export default async function Home() {
  const snap = await provider.getSnapshot();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <TopBar />

        <main className="space-y-5 p-6">
          {/* KPI 4枚 */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="総資産"
              value={jpy(snap.totalBalance.value)}
              change={snap.totalBalance.change}
              spark={snap.totalBalance.spark}
              icon={<IconWallet size={18} />}
              sparkColor="var(--accent)"
            />
            <StatCard
              label="当日損益"
              value={signedJpy(snap.todayPnl.value)}
              change={snap.todayPnl.change}
              spark={snap.todayPnl.spark}
              icon={<IconArrowUpRight size={18} />}
            />
            <StatCard
              label="評価損益（含み）"
              value={signedJpy(snap.unrealizedPnl.value)}
              change={snap.unrealizedPnl.change}
              spark={snap.unrealizedPnl.spark}
              icon={<IconChart size={18} />}
            />
            <StatCard
              label="勝率"
              value={`${snap.winRate.value.toFixed(1)}%`}
              change={snap.winRate.change}
              spark={snap.winRate.spark}
              icon={<IconBot size={18} />}
              sparkColor="var(--accent-2)"
            />
          </section>

          {/* メインチャート + サイド */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <MainChartCard
                data={snap.equityCurve}
                total={snap.totalBalance.value}
                change={snap.totalBalance.change}
              />
            </div>
            <div className="space-y-5">
              <AllocationCard holdings={snap.holdings} total={snap.totalBalance.value} />
              <WatchlistCard items={snap.watchlist} />
            </div>
          </section>

          {/* 保有銘柄 + 取引/リスク */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <HoldingsCard holdings={snap.holdings} />
            </div>
            <div className="space-y-5">
              <TradesCard trades={snap.trades} />
              <RiskCard dailyLimit={500_000} used={123_456} />
            </div>
          </section>

          <footer className="pt-2 text-center text-xs text-[var(--muted)]">
            © 2026 AURORA · 個人資産管理ダッシュボード · モックデータ表示中
          </footer>
        </main>
      </div>
    </div>
  );
}
