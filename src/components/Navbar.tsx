import { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { NavigationPage } from '../types/finance';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems: { id: NavigationPage; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'investments', label: 'Investments' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'goals', label: 'Goals' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#12352B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <span className="text-2xl sm:text-3xl font-serif italic text-[#12352B] tracking-tight group-hover:text-[#B99A5A] transition-colors">
            WEALTHIA
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#B99A5A]" />
        </button>

        {/* Zone 2: Navigation Links (Text with subtle hover state) */}
        <nav className="hidden lg:flex items-center gap-7">
          {mainNavItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-sans whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#12352B] font-semibold'
                    : 'text-[#68716C] hover:text-[#12352B]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12352B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {currentPage === 'landing' ? (
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <span>View Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('settings')}
                className={`px-3 py-1.5 text-xs font-sans rounded-lg border transition-all cursor-pointer ${
                  currentPage === 'settings'
                    ? 'bg-[#12352B] text-[#FAF8F3] border-[#12352B]'
                    : 'text-[#68716C] border-[#12352B]/15 hover:border-[#12352B]/40 hover:text-[#12352B]'
                }`}
              >
                Settings
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('landing')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-[#68716C] hover:text-[#12352B] transition-colors cursor-pointer"
              >
                <span>Landing</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#12352B] hover:bg-[#12352B]/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F3] border-b border-[#12352B]/10 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#12352B]/10">
            <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium">
              Navigation Menu
            </span>
            <div className="flex items-center gap-1 text-xs text-[#12352B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B99A5A]" />
              <span>Private Vault</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors ${
                currentPage === 'landing' ? 'bg-[#12352B] text-[#FAF8F3]' : 'text-[#1E2421] hover:bg-[#12352B]/5'
              }`}
            >
              Landing Page
            </button>
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors ${
                  currentPage === item.id ? 'bg-[#12352B] text-[#FAF8F3]' : 'text-[#1E2421] hover:bg-[#12352B]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('settings')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors ${
                currentPage === 'settings' ? 'bg-[#12352B] text-[#FAF8F3]' : 'text-[#1E2421] hover:bg-[#12352B]/5'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
