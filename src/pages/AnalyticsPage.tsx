import { useState } from 'react';
import { ArrowUpRight, TrendingUp, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { ASSET_CATEGORIES, MONTHLY_CASH_FLOW, SUMMARY_STATS } from '../data/mockData';
import { CurvedChart } from '../components/CurvedChart';
import { AllocationDonut } from '../components/AllocationDonut';

export function AnalyticsPage() {
  const [cashFlowRange, setCashFlowRange] = useState<'6M' | '1Y'>('6M');

  const maxIncome = Math.max(...MONTHLY_CASH_FLOW.map((d) => d.income));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Fiduciary Intelligence
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Financial Analytics
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Deep attribution modeling of net worth trajectory, cash flow margins, and asset efficiencies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#68716C]">
          <span className="w-2 h-2 rounded-full bg-[#12352B]" />
          <span>Calculated with time-weighted returns</span>
        </div>
      </div>

      {/* Top Statistical Ratios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Average Savings Rate
          </span>
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums mt-1 block">
            51.8%
          </span>
          <span className="text-xs text-[#12352B] font-medium mt-1 block">
            +$6,300 retained/month avg
          </span>
        </div>

        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Sharpe Ratio (1Y)
          </span>
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums mt-1 block">
            1.84
          </span>
          <span className="text-xs text-[#68716C] mt-1 block">
            Top decile risk-adjusted yield
          </span>
        </div>

        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Trailing 12M Return
          </span>
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums mt-1 block">
            +11.4%
          </span>
          <span className="text-xs text-[#12352B] font-medium mt-1 block">
            Alpha spread: +2.1% vs S&P
          </span>
        </div>

        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Portfolio Beta
          </span>
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums mt-1 block">
            0.82
          </span>
          <span className="text-xs text-[#68716C] mt-1 block">
            18% less volatile than market
          </span>
        </div>
      </div>

      {/* Net Worth Growth (Curved Chart) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] sm:text-[34px] font-serif italic text-[#12352B]">
              Net Worth Growth Trajectory
            </h2>
            <p className="text-sm font-sans text-[#68716C]">
              Consolidated equity and capital compounding over configurable horizons.
            </p>
          </div>
        </div>

        <CurvedChart initialFilter="1Y" showBenchmark={true} height={350} />
      </section>

      {/* Two Column Section: Income vs Expenses & Monthly Savings Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Income vs Expenses Bar Chart */}
        <div className="lg:col-span-7 bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#12352B]/8">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
                Cash Flow Equilibrium
              </span>
              <h3 className="text-[24px] font-serif italic text-[#12352B] mt-0.5">
                Income vs Expenses
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#12352B]" />
                <span>Income</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B99A5A]" />
                <span>Expenses</span>
              </span>
            </div>
          </div>

          {/* Clean Custom Bar Chart */}
          <div className="space-y-5 pt-2">
            {MONTHLY_CASH_FLOW.map((item) => {
              const incomePct = (item.income / maxIncome) * 100;
              const expensePct = (item.expenses / maxIncome) * 100;

              return (
                <div key={item.month} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#1E2421] font-sans">{item.month}</span>
                    <div className="flex items-center gap-4 tabular-nums">
                      <span className="text-[#12352B] font-medium">In: ${item.income.toLocaleString()}</span>
                      <span className="text-[#8F743E]">Out: ${item.expenses.toLocaleString()}</span>
                      <span className="text-[#68716C] font-medium">Net: +${item.savings.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Dual Bar Container */}
                  <div className="space-y-1">
                    <div className="h-3 w-full bg-[#12352B]/5 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-[#12352B] rounded-md transition-all duration-700"
                        style={{ width: `${incomePct}%` }}
                      />
                    </div>
                    <div className="h-2.5 w-full bg-[#B99A5A]/10 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-[#B99A5A] rounded-md transition-all duration-700"
                        style={{ width: `${expensePct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#12352B]/8 flex justify-between text-xs text-[#68716C]">
            <span>Consistent discretionary surplus</span>
            <span className="text-[#12352B] font-semibold">Zero debt financing</span>
          </div>
        </div>

        {/* Monthly Savings Rate */}
        <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="pb-4 border-b border-[#12352B]/8">
              <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
                Capital Retention
              </span>
              <h3 className="text-[24px] font-serif italic text-[#12352B] mt-0.5">
                Monthly Savings Rate
              </h3>
              <p className="text-xs text-[#68716C] mt-1">
                Percentage of monthly gross revenue converted into investments and liquid cash.
              </p>
            </div>

            <div className="pt-6 space-y-4">
              {MONTHLY_CASH_FLOW.map((item) => (
                <div key={item.month} className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-[#1E2421] w-10">{item.month}</span>
                  <div className="flex-1 h-3 bg-[#12352B]/8 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#12352B] to-[#B99A5A] rounded-full"
                      style={{ width: `${item.savingsRate}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#12352B] tabular-nums w-12 text-right">
                    {item.savingsRate}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#F5F1E8] rounded-xl border border-[#12352B]/8 text-xs text-[#68716C] space-y-1">
            <span className="font-semibold text-[#12352B] block">Benchmark Comparison</span>
            <span>
              Your average 51.8% savings velocity outperforms 97% of private wealth peer portfolios in your tier.
            </span>
          </div>
        </div>
      </div>

      {/* Asset Allocation Breakdown */}
      <section className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="pb-4 border-b border-[#12352B]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[24px] font-serif italic text-[#12352B]">
              Consolidated Asset Allocation
            </h3>
            <p className="text-xs text-[#68716C] mt-0.5">
              Target vs actual weightings calibrated for balanced growth.
            </p>
          </div>
          <span className="text-xs text-[#68716C]">
            Model: Balanced Growth (Target Volatility: 8.5%)
          </span>
        </div>

        <AllocationDonut categories={ASSET_CATEGORIES} showLegend={true} />
      </section>
    </div>
  );
}
