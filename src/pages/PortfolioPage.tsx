import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw, SlidersHorizontal, ShieldAlert, Sparkles } from 'lucide-react';
import { AssetCategory, InvestmentItem, NavigationPage } from '../types/finance';
import { AllocationDonut } from '../components/AllocationDonut';

interface PortfolioPageProps {
  categories: AssetCategory[];
  investments: InvestmentItem[];
  onNavigate: (page: NavigationPage) => void;
}

export function PortfolioPage({ categories, investments, onNavigate }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showRebalanceSim, setShowRebalanceSim] = useState(false);

  const totalPortfolioValue = categories.reduce((sum, c) => sum + c.value, 0);

  const filteredInvestments = selectedCategory === 'all'
    ? investments
    : investments.filter((inv) => {
        if (selectedCategory === 'stocks') return inv.category === 'Stocks';
        if (selectedCategory === 'etfs') return inv.category === 'ETFs';
        if (selectedCategory === 'bonds') return inv.category === 'Bonds';
        if (selectedCategory === 'real-estate') return inv.category === 'Real Estate';
        return true;
      });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Capital Architecture
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Portfolio Allocation
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Total consolidated assets under tracking: <strong className="text-[#12352B] tabular-nums font-semibold">${totalPortfolioValue.toLocaleString()}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowRebalanceSim(!showRebalanceSim)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-xl transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showRebalanceSim ? 'Hide Simulation' : 'Rebalance Simulator'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('investments')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>Explore All Holdings</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Rebalance Simulator Drawer if toggled */}
      {showRebalanceSim && (
        <div className="bg-[#FAF8F3] border border-[#B99A5A]/40 rounded-2xl p-6 sm:p-8 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B99A5A]" />
                <span className="text-xs uppercase tracking-wider text-[#B99A5A] font-semibold">
                  Intelligent Rebalance Simulator
                </span>
              </div>
              <h3 className="text-[22px] font-serif italic text-[#12352B] mt-0.5">
                Target Allocation Drift Diagnostic
              </h3>
            </div>
            <span className="text-xs text-[#68716C]">Drift tolerance: ±2.5%</span>
          </div>
          <p className="text-sm font-sans text-[#68716C] leading-relaxed max-w-3xl">
            Due to outperformance in equities, Stocks are currently overweight (+2.1%), while Real Estate and Fixed Income are underweight. Suggested action: Direct upcoming monthly contributions ($3,450) into Real Estate REITs and Treasury Bonds without selling shares, avoiding taxable events.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#12352B]/10">
              <span className="text-[#68716C] block">Suggested Cash Deployment</span>
              <span className="font-semibold text-base text-[#12352B] tabular-nums mt-0.5 block">$3,450.00</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#12352B]/10">
              <span className="text-[#68716C] block">Target Tax Savings</span>
              <span className="font-semibold text-base text-[#12352B] tabular-nums mt-0.5 block">$840 (Zero Capital Gains)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#12352B]/10">
              <span className="text-[#68716C] block">Projected Sharpe Post-Rebalance</span>
              <span className="font-semibold text-base text-[#12352B] tabular-nums mt-0.5 block">1.92 (+0.08)</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Allocation Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F3] border border-[#12352B]/10 rounded-3xl p-6 sm:p-10">
        <div className="lg:col-span-5 flex justify-center">
          <AllocationDonut categories={categories} showLegend={false} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="pb-3 border-b border-[#12352B]/10">
            <h2 className="text-[28px] font-serif italic text-[#12352B]">
              Active Asset Distribution
            </h2>
            <p className="text-sm text-[#68716C] font-sans">
              Weighted by liquidity tier, geographical diversification, and risk tolerance profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {categories.map((cat) => {
              const drift = cat.allocationPercent - cat.targetPercent;
              const isOver = drift > 0;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white border-[#12352B] shadow-xs'
                      : 'bg-[#FAF8F3] border-[#12352B]/10 hover:border-[#12352B]/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm font-semibold text-[#1E2421] font-sans">{cat.name}</span>
                    </div>
                    <span className="text-xs font-sans text-[#68716C] tabular-nums">
                      Target {cat.targetPercent}%
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xl font-serif italic text-[#12352B] tabular-nums">
                      ${cat.value.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-[#1E2421] tabular-nums font-sans">
                      {cat.allocationPercent}%
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-[#68716C] pt-2 border-t border-[#12352B]/6">
                    <span>Risk: {cat.riskLevel}</span>
                    <span className={`tabular-nums ${isOver ? 'text-[#12352B]' : 'text-[#B99A5A]'}`}>
                      {isOver ? '+' : ''}{drift.toFixed(1)}% drift
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Asset Class Deep-Dive Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] sm:text-[34px] font-serif italic text-[#12352B]">
              Asset Class Breakdown
            </h2>
            <p className="text-sm font-sans text-[#68716C]">
              Detailed performance, return parameters, and underlying holding counts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#68716C]">Filter view:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-sans bg-white border border-[#12352B]/15 rounded-lg px-3 py-1.5 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="stocks">Stocks Only</option>
              <option value="etfs">ETFs Only</option>
              <option value="bonds">Bonds Only</option>
              <option value="real-estate">Real Estate Only</option>
            </select>
          </div>
        </div>

        {/* Investment Details Table */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-[#F5F1E8] border-b border-[#12352B]/10 text-xs font-semibold text-[#68716C] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Asset / Security</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Holding Value</th>
                  <th className="py-3.5 px-4 text-right">Allocation</th>
                  <th className="py-3.5 px-4 text-right">Performance</th>
                  <th className="py-3.5 px-4">Risk Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#12352B]/8 text-[#1E2421]">
                {filteredInvestments.map((inv) => {
                  const isPositive = inv.performancePercent >= 0;
                  return (
                    <tr key={inv.id} className="hover:bg-white/80 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#1E2421]">{inv.name}</span>
                          <span className="text-xs text-[#68716C] tracking-wider">{inv.ticker}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-[#12352B] bg-[#12352B]/5 px-2.5 py-1 rounded-md">
                          {inv.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-semibold tabular-nums text-[#12352B]">
                            ${inv.currentValue.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#68716C] tabular-nums">
                            {inv.shares} shares @ ${inv.currentPrice.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium tabular-nums text-[#1E2421]">
                        {inv.allocationPercent}%
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold tabular-nums ${
                            isPositive ? 'text-[#12352B]' : 'text-rose-700'
                          }`}
                        >
                          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {isPositive ? '+' : ''}{inv.performancePercent}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-[#68716C]">
                          {inv.risk} Tier
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
