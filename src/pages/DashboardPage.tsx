import { ArrowUpRight, ArrowDownRight, Plus, ChevronRight, Wallet, PieChart, ShieldCheck } from 'lucide-react';
import { SUMMARY_STATS } from '../data/mockData';
import { CurvedChart } from '../components/CurvedChart';
import { AllocationDonut } from '../components/AllocationDonut';
import { CurvedGoalProgress } from '../components/CurvedGoalProgress';
import { AssetCategory, FinancialGoal, NavigationPage, Transaction } from '../types/finance';

interface DashboardPageProps {
  categories: AssetCategory[];
  transactions: Transaction[];
  goals: FinancialGoal[];
  onNavigate: (page: NavigationPage) => void;
  onOpenNewTransaction: () => void;
  onOpenNewGoal: () => void;
}

export function DashboardPage({
  categories,
  transactions,
  goals,
  onNavigate,
  onOpenNewTransaction,
  onOpenNewGoal,
}: DashboardPageProps) {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Private Portfolio Overview
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Financial Dashboard
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Real-time multi-asset aggregation as of {SUMMARY_STATS.lastUpdated}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenNewTransaction}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#B99A5A]" />
            <span>Record Transaction</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('reports')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-xl transition-all cursor-pointer"
          >
            <span>Generate Statement</span>
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards (Mandatory Exact Values) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Wealth */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#68716C]">
            <span className="text-xs uppercase tracking-wider font-medium">Total Wealth</span>
            <Wallet className="w-4 h-4 text-[#12352B]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-serif italic text-[#12352B] tabular-nums tracking-tight">
              ${SUMMARY_STATS.totalWealth.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#12352B] font-medium font-sans">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+${SUMMARY_STATS.monthlyChangeAmount.toLocaleString()} this cycle</span>
          </div>
        </div>

        {/* Investments */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#68716C]">
            <span className="text-xs uppercase tracking-wider font-medium">Investments</span>
            <PieChart className="w-4 h-4 text-[#12352B]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-serif italic text-[#12352B] tabular-nums tracking-tight">
              ${SUMMARY_STATS.investments.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-xs text-[#68716C] font-sans">
            <span>69.7% of total portfolio balance</span>
          </div>
        </div>

        {/* Cash */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#68716C]">
            <span className="text-xs uppercase tracking-wider font-medium">Cash</span>
            <ShieldCheck className="w-4 h-4 text-[#12352B]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-serif italic text-[#12352B] tabular-nums tracking-tight">
              ${SUMMARY_STATS.cash.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-xs text-[#68716C] font-sans">
            <span>4.85% APY Treasury Yield Reserve</span>
          </div>
        </div>

        {/* Monthly Change */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#68716C]">
            <span className="text-xs uppercase tracking-wider font-medium">Monthly Change</span>
            <span className="w-2 h-2 rounded-full bg-[#12352B]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-serif italic text-[#12352B] tabular-nums tracking-tight">
              +{SUMMARY_STATS.monthlyChangePercent}%
            </span>
          </div>
          <div className="mt-2 text-xs text-[#12352B] font-medium font-sans">
            <span>Beating benchmark by +1.6%</span>
          </div>
        </div>
      </div>

      {/* Large Portfolio Performance Chart (Smooth Curves) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] sm:text-[34px] font-serif italic text-[#12352B]">
              Performance Trajectory
            </h2>
            <p className="text-sm font-sans text-[#68716C]">
              Continuous net asset compounding calibrated against S&P 500 total return.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('analytics')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-sans font-medium text-[#12352B] hover:text-[#B99A5A] transition-colors cursor-pointer"
          >
            <span>Full Analytics Suite</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <CurvedChart initialFilter="6M" showBenchmark={true} height={360} />
      </section>

      {/* Two Column Grid: Allocation Donut & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Portfolio Allocation */}
        <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#12352B]/8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
                  Asset Weighting
                </span>
                <h3 className="text-[24px] font-serif italic text-[#12352B] mt-0.5">
                  Portfolio Allocation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="text-xs font-sans text-[#12352B] hover:text-[#B99A5A] font-medium transition-colors cursor-pointer"
              >
                Rebalance
              </button>
            </div>

            <div className="py-6">
              <AllocationDonut categories={categories} showLegend={true} />
            </div>
          </div>

          <div className="pt-4 border-t border-[#12352B]/8 flex items-center justify-between text-xs text-[#68716C]">
            <span>Optimal Sharpe model</span>
            <span className="text-[#12352B] font-medium">96% Target Parity</span>
          </div>
        </div>

        {/* Right: Recent Transactions */}
        <div className="lg:col-span-7 bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#12352B]/8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
                  Activity Feed
                </span>
                <h3 className="text-[24px] font-serif italic text-[#12352B] mt-0.5">
                  Recent Transactions
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('transactions')}
                className="text-xs font-sans text-[#12352B] hover:text-[#B99A5A] font-medium transition-colors cursor-pointer"
              >
                View All ({transactions.length})
              </button>
            </div>

            <div className="divide-y divide-[#12352B]/8">
              {recentTransactions.map((tx) => {
                const isCredit = tx.amount > 0;
                return (
                  <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isCredit ? 'bg-[#12352B]/10 text-[#12352B]' : 'bg-[#B99A5A]/15 text-[#8F743E]'
                        }`}
                      >
                        {isCredit ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-[#1E2421] truncate block font-sans">
                          {tx.description}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-[#68716C]">
                          <span>{tx.date}</span>
                          <span>·</span>
                          <span>{tx.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-sm font-semibold tabular-nums block font-sans ${
                          isCredit ? 'text-[#12352B]' : 'text-[#1E2421]'
                        }`}
                      >
                        {isCredit ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[11px] text-[#68716C] font-sans">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#12352B]/8 flex items-center justify-between">
            <span className="text-xs text-[#68716C] font-sans">
              All accounts reconciled
            </span>
            <button
              type="button"
              onClick={onOpenNewTransaction}
              className="text-xs font-sans text-[#12352B] hover:text-[#B99A5A] font-medium transition-colors cursor-pointer"
            >
              + Log New Entry
            </button>
          </div>
        </div>
      </div>

      {/* Financial Goals Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] sm:text-[34px] font-serif italic text-[#12352B]">
              Financial Goals & Milestones
            </h2>
            <p className="text-sm font-sans text-[#68716C]">
              Continuous progress arcs tracking your capital horizons.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenNewGoal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Milestone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal) => (
            <CurvedGoalProgress
              key={goal.id}
              goal={goal}
              onContribute={() => onNavigate('goals')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
