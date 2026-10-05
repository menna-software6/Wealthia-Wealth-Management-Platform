import { ArrowUpRight, TrendingUp, ShieldCheck, Compass, Sparkles, ChevronRight } from 'lucide-react';
import { NavigationPage } from '../types/finance';
import { CurvedChart } from '../components/CurvedChart';
import heroEditorialImg from '../assets/images/wealthia_hero_editorial_1791197333641.jpg';

interface LandingPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="w-full bg-[#FAF8F3] text-[#1E2421]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[#12352B]/10">
        {/* Subtle decorative curved background gradients */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-[#12352B]/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-[#B99A5A]/[0.05] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Tagline / Brand Kicker */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-[#B99A5A] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5A]" />
              <span>Modern Private Wealth & Investment Platform</span>
            </div>

            {/* Main Hero Headline in Cormorant Garamond Italic */}
            <h1 className="text-[48px] sm:text-[60px] lg:text-[72px] font-serif italic text-[#12352B] leading-[1.06] tracking-tight text-balance">
              Your wealth,
              <br />
              beautifully organized.
            </h1>

            {/* Supporting Subtext in Inter */}
            <p className="mt-6 text-lg sm:text-xl text-[#68716C] font-sans leading-relaxed max-w-2xl">
              Understand your money, track your investments, and build a clearer path toward the future.
            </p>

            {/* Hero CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore Wealthia</span>
                <ArrowUpRight className="w-4 h-4 text-[#B99A5A]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-xl transition-all cursor-pointer"
              >
                <span>View Demo</span>
                <ChevronRight className="w-4 h-4 text-[#68716C]" />
              </button>
            </div>

            {/* Proof Metric Adjacency */}
            <div className="mt-12 flex items-center gap-8 pt-6 border-t border-[#12352B]/10 text-xs font-sans text-[#68716C]">
              <div>
                <span className="font-semibold text-base text-[#12352B] tabular-nums block font-sans">
                  $284,650
                </span>
                <span>Active Tracked Portfolio</span>
              </div>
              <div className="h-7 w-px bg-[#12352B]/15" />
              <div>
                <span className="font-semibold text-base text-[#12352B] tabular-nums block font-sans">
                  +11.4%
                </span>
                <span>Annualized Alpha Yield</span>
              </div>
              <div className="h-7 w-px bg-[#12352B]/15" />
              <div>
                <span className="font-semibold text-base text-[#12352B] tabular-nums block font-sans">
                  0.0%
                </span>
                <span>Hidden Commission Drag</span>
              </div>
            </div>
          </div>

          {/* Curved Financial Growth Visualization Container */}
          <div className="mt-16 lg:mt-20">
            <div className="relative">
              {/* Subtle organic SVG curve flourish behind the chart */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#12352B]/10 via-[#B99A5A]/15 to-[#12352B]/5 rounded-3xl blur-xl opacity-60 -z-10" />

              <CurvedChart initialFilter="6M" showBenchmark={true} height={340} />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Luxury Image & Philosophy Banner */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="overflow-hidden rounded-3xl border border-[#12352B]/15 shadow-xl relative aspect-[16/10]">
              <img
                src={heroEditorialImg}
                alt="Wealthia Architectural Philosophy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B241D]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-[#FAF8F3]">
                <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-medium block">
                  Private Wealth Philosophy
                </span>
                <span className="text-xl font-serif italic">
                  Calm geometry for enduring capital longevity.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold">
              The Wealthia Standard
            </span>
            <h2 className="text-[34px] sm:text-[40px] font-serif italic text-[#12352B] leading-tight">
              Build wealth with intention, not impulse.
            </h2>
            <p className="text-[#68716C] font-sans leading-relaxed text-base">
              Traditional banking treats your net worth as disconnected transactions. Wealthia orchestrates every dollar into an interconnected ecosystem of long-term security, equity appreciation, and tax-efficient liquidity.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#12352B]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-[#12352B]" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-[#1E2421]">Curved Alpha Calibration</h4>
                  <p className="text-sm text-[#68716C] mt-0.5">
                    Dynamic tracking models that project multi-year compounding trajectories while buffering against market volatility.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#12352B]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4 text-[#12352B]" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-[#1E2421]">Holistic Multi-Asset Sleeves</h4>
                  <p className="text-sm text-[#68716C] mt-0.5">
                    Unify index equities, fixed income securities, real estate REITs, and liquidity reserves into one serene console.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#12352B]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#12352B]" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-[#1E2421]">Institutional Grade Ledger</h4>
                  <p className="text-sm text-[#68716C] mt-0.5">
                    Bank-level encryption with verifiable transaction provenance and downloadable fiduciary report statements.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#12352B] hover:text-[#B99A5A] transition-colors cursor-pointer"
              >
                <span>Enter Personal Dashboard</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 bg-[#F5F1E8] border-y border-[#12352B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold">
              Complete Wealth System
            </span>
            <h2 className="text-[34px] sm:text-[40px] font-serif italic text-[#12352B] mt-1">
              Every dimension of financial clarity.
            </h2>
            <p className="text-[#68716C] font-sans mt-2 text-base">
              A bespoke suite engineered for investors seeking calm mastery over their assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              onClick={() => onNavigate('portfolio')}
              className="bg-[#FAF8F3] p-8 rounded-2xl border border-[#12352B]/10 hover:border-[#12352B]/30 transition-all cursor-pointer group"
            >
              <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium">01 · Allocation</span>
              <h3 className="text-[24px] font-serif italic text-[#12352B] mt-2 group-hover:text-[#B99A5A] transition-colors">
                Portfolio Balance
              </h3>
              <p className="text-sm font-sans text-[#68716C] mt-3 leading-relaxed">
                Visualise the golden ratio between stocks, ETFs, fixed income, real estate, and liquidity. Detect allocation drifts in real-time.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#12352B]">
                <span>Inspect Allocation</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onNavigate('goals')}
              className="bg-[#FAF8F3] p-8 rounded-2xl border border-[#12352B]/10 hover:border-[#12352B]/30 transition-all cursor-pointer group"
            >
              <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium">02 · Trajectory</span>
              <h3 className="text-[24px] font-serif italic text-[#12352B] mt-2 group-hover:text-[#B99A5A] transition-colors">
                Curved Goal Milestones
              </h3>
              <p className="text-sm font-sans text-[#68716C] mt-3 leading-relaxed">
                Retirement horizons, real estate down payments, and emergency reserves mapped against automated monthly contributions.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#12352B]">
                <span>Track Milestones</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onNavigate('reports')}
              className="bg-[#FAF8F3] p-8 rounded-2xl border border-[#12352B]/10 hover:border-[#12352B]/30 transition-all cursor-pointer group"
            >
              <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium">03 · Governance</span>
              <h3 className="text-[24px] font-serif italic text-[#12352B] mt-2 group-hover:text-[#B99A5A] transition-colors">
                Fiduciary Reporting
              </h3>
              <p className="text-sm font-sans text-[#68716C] mt-3 leading-relaxed">
                Generate polished wealth statements, tax-loss harvesting summaries, and performance attribution records ready for review.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#12352B]">
                <span>Generate Statements</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto bg-[#12352B] text-[#FAF8F3] p-10 sm:p-16 rounded-3xl relative overflow-hidden shadow-2xl">
          {/* Subtle curved background rings */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-[#B99A5A]/20 pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B99A5A] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Wealth Architecture</span>
          </span>

          <h2 className="text-[36px] sm:text-[48px] font-serif italic text-white leading-tight">
            Build wealth with intention.
          </h2>

          <p className="mt-4 text-[#A8B9A5] text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
            Experience the calm precision of an intelligent personal wealth management platform.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-sans font-medium text-[#12352B] bg-[#FAF8F3] hover:bg-white rounded-xl transition-all shadow-lg cursor-pointer"
            >
              <span>Launch Dashboard Experience</span>
              <ArrowUpRight className="w-4 h-4 text-[#12352B]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
