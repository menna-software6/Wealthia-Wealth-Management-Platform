import { useState, useMemo } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, SlidersHorizontal, Plus, ShieldCheck } from 'lucide-react';
import { InvestmentItem, NavigationPage } from '../types/finance';

interface InvestmentsPageProps {
  investments: InvestmentItem[];
  onNavigate: (page: NavigationPage) => void;
}

export function InvestmentsPage({ investments, onNavigate }: InvestmentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'value' | 'performance' | 'allocation'>('value');
  const [activeInvestmentId, setActiveInvestmentId] = useState<string | null>(null);

  const categories = ['All', 'Stocks', 'ETFs', 'Bonds', 'Real Estate', 'Funds'];
  const riskTiers = ['All', 'Low', 'Moderate', 'Balanced', 'Growth', 'High'];

  const filteredInvestments = useMemo(() => {
    return investments
      .filter((inv) => {
        const matchesSearch =
          inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.ticker.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'All' || inv.category === selectedCategory;
        const matchesRisk =
          selectedRisk === 'All' || inv.risk === selectedRisk;
        return matchesSearch && matchesCategory && matchesRisk;
      })
      .sort((a, b) => {
        if (sortBy === 'value') return b.currentValue - a.currentValue;
        if (sortBy === 'performance') return b.performancePercent - a.performancePercent;
        if (sortBy === 'allocation') return b.allocationPercent - a.allocationPercent;
        return 0;
      });
  }, [investments, searchTerm, selectedCategory, selectedRisk, sortBy]);

  const totalFilteredValue = filteredInvestments.reduce((sum, i) => sum + i.currentValue, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Holdings & Discovery
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Investment Portfolio
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Track individual securities, cost basis, unrealized gain, and risk allocation weights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-xl transition-all cursor-pointer"
          >
            <span>Allocation Breakdown</span>
          </button>
        </div>
      </div>

      {/* Search, Filter Tabs & Sort Controls */}
      <div className="space-y-4 bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#68716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by security name or ticker (e.g. Apple, VOO, Treasury)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#68716C] shrink-0">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-sans bg-white border border-[#12352B]/15 rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="value">Highest Value</option>
              <option value="performance">Best Performance</option>
              <option value="allocation">Largest Allocation %</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#12352B]/8">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#68716C] mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-sans rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#12352B] text-[#FAF8F3] font-medium'
                    : 'text-[#68716C] hover:text-[#12352B] hover:bg-[#12352B]/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#68716C]">Risk Tier:</span>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="text-xs font-sans bg-white border border-[#12352B]/15 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              {riskTiers.map((r) => (
                <option key={r} value={r}>
                  {r} Risk
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary count */}
      <div className="flex items-center justify-between text-xs text-[#68716C] px-1">
        <span>
          Showing {filteredInvestments.length} securities · Consolidated subtotal:{' '}
          <strong className="text-[#12352B] tabular-nums font-semibold">
            ${totalFilteredValue.toLocaleString()}
          </strong>
        </span>
        <span>Tap any holding to inspect tax lot & purchase parameters</span>
      </div>

      {/* Holdings Grid */}
      {filteredInvestments.length === 0 ? (
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-12 text-center space-y-3">
          <p className="text-base text-[#1E2421] font-serif italic text-xl">
            No securities matched your search criteria.
          </p>
          <p className="text-xs text-[#68716C]">
            Try clearing the search query or selecting "All" categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedRisk('All');
            }}
            className="text-xs font-sans font-medium text-[#12352B] underline mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestments.map((inv) => {
            const isPositive = inv.performancePercent >= 0;
            const isExpanded = activeInvestmentId === inv.id;
            return (
              <div
                key={inv.id}
                onClick={() => setActiveInvestmentId(isExpanded ? null : inv.id)}
                className={`bg-[#FAF8F3] border rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'border-[#12352B] shadow-md ring-1 ring-[#12352B]/20'
                    : 'border-[#12352B]/10 hover:border-[#12352B]/30'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#12352B] bg-[#12352B]/5 px-2 py-0.5 rounded">
                          {inv.ticker}
                        </span>
                        <span className="text-xs text-[#68716C]">
                          {inv.category}
                        </span>
                      </div>
                      <h3 className="text-[20px] font-serif italic text-[#12352B] mt-2 leading-snug">
                        {inv.name}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums ${
                          isPositive ? 'text-[#12352B]' : 'text-rose-700'
                        }`}
                      >
                        {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {isPositive ? '+' : ''}{inv.performancePercent}%
                      </span>
                      <span className="text-[11px] text-[#68716C] block">1Y Return</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-baseline justify-between pt-4 border-t border-[#12352B]/8">
                    <div>
                      <span className="text-xs text-[#68716C] block">Holding Value</span>
                      <span className="text-2xl font-serif italic text-[#12352B] tabular-nums mt-0.5 block">
                        ${inv.currentValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#68716C] block">Weight</span>
                      <span className="text-sm font-semibold text-[#1E2421] tabular-nums mt-0.5 block">
                        {inv.allocationPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#12352B]/10 space-y-2.5 text-xs animate-in fade-in duration-200">
                    <div className="flex justify-between text-[#68716C]">
                      <span>Shares Owned</span>
                      <span className="font-medium text-[#1E2421] tabular-nums">{inv.shares} units</span>
                    </div>
                    <div className="flex justify-between text-[#68716C]">
                      <span>Average Cost</span>
                      <span className="font-medium text-[#1E2421] tabular-nums">${inv.avgPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#68716C]">
                      <span>Market Price</span>
                      <span className="font-medium text-[#1E2421] tabular-nums">${inv.currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#68716C]">
                      <span>Unrealized Gain</span>
                      <span className="font-semibold text-[#12352B] tabular-nums">
                        +${inv.unrealizedGain.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#68716C]">
                      <span>Risk Classification</span>
                      <span className="font-medium text-[#1E2421]">{inv.risk} Tier</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#12352B]/6 flex items-center justify-between text-[11px] text-[#68716C]">
                  <span>Risk: {inv.risk}</span>
                  <span className="text-[#12352B] font-medium">
                    {isExpanded ? 'Click to collapse' : 'Click to inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
