import { NavigationPage } from '../types/finance';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#12352B] text-[#FAF8F3] mt-24 border-t border-[#12352B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-3xl font-serif italic tracking-tight text-[#FAF8F3] block">
              WEALTHIA
            </span>
            <p className="text-sm font-sans text-[#A8B9A5] max-w-sm leading-relaxed">
              Modern personal wealth and financial management platform. Build wealth with intention.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#FAF8F3]/60">
              <span className="w-2 h-2 rounded-full bg-[#B99A5A]" />
              <span>Institutional security & SOC2 Type II standards</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#A8B9A5] font-semibold block">
              Platform Views
            </span>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio Allocation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('investments')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Investment Tracking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('transactions')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Transaction Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Planning & Documents */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#A8B9A5] font-semibold block">
              Intelligence & Governance
            </span>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('goals')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Financial Goals & Milestones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('analytics')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Cash Flow & Growth Analytics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('reports')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Downloadable Wealth Reports
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('settings')}
                  className="text-[#FAF8F3]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Account & Allocation Rules
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F3]/50 font-sans">
          <p>© {new Date().getFullYear()} Wealthia Private Capital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Portfolio Demo Application</span>
            <span>·</span>
            <span>Crafted for Software Engineering Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
