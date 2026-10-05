import { useState } from 'react';
import { User, Shield, Bell, Landmark, Check, Save } from 'lucide-react';
import avatarImg from '../assets/images/wealthia_member_avatar_1791197346628.jpg';

export function SettingsPage() {
  const [currency, setCurrency] = useState('USD ($)');
  const [model, setModel] = useState('Balanced Growth');
  const [riskTolerance, setRiskTolerance] = useState('Growth');
  const [driftAlerts, setDriftAlerts] = useState(true);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [dividendNotices, setDividendNotices] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Member Preferences
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Account & Governance
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Manage your personal profile, linked custodial institutions, and automated risk parameters.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12352B]/10 text-[#12352B] text-xs font-medium rounded-lg animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      {/* Member Profile Card with Portrait Image */}
      <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#12352B]/20 shadow-md">
            <img
              src={avatarImg}
              alt="Julian Vance"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#12352B] border-2 border-[#FAF8F3]" />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="text-2xl font-serif italic text-[#12352B]">
              Julian Vance
            </h3>
            <span className="inline-block text-xs font-sans font-medium text-[#12352B] bg-[#12352B]/5 px-2.5 py-0.5 rounded-full border border-[#12352B]/10 w-fit mx-auto sm:mx-0">
              Private Wealth Member
            </span>
          </div>
          <p className="text-xs text-[#68716C]">
            julian.vance@wealthia-vault.io · Advisory Tier: Bespoke Capital · Member since 2023
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-[#68716C]">
            <span>Account ID: WTH-8842-US</span>
            <span>·</span>
            <span>Tax Jurisdiction: United States (Fed & State)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Financial Preferences Section */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-[#12352B]/8">
            <h3 className="text-[22px] font-serif italic text-[#12352B]">
              Financial Preferences & Asset Rules
            </h3>
            <p className="text-xs text-[#68716C] mt-0.5">
              Customize how Wealthia tracks currency valuation, risk models, and rebalancing parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Base Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full text-xs font-sans bg-white border border-[#12352B]/15 rounded-xl px-3.5 py-2.5 focus:outline-none"
              >
                <option value="USD ($)">USD ($) — United States Dollar</option>
                <option value="EUR (€)">EUR (€) — Euro</option>
                <option value="GBP (£)">GBP (£) — British Pound</option>
                <option value="CHF (Fr)">CHF (Fr) — Swiss Franc</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Target Allocation Strategy
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full text-xs font-sans bg-white border border-[#12352B]/15 rounded-xl px-3.5 py-2.5 focus:outline-none"
              >
                <option value="Balanced Growth">Balanced Growth (60/40 Equity-Fixed)</option>
                <option value="Capital Preservation">Capital Preservation (Defensive)</option>
                <option value="Aggressive Alpha">Aggressive Alpha (85% Equities)</option>
                <option value="All-Weather Endowment">All-Weather Endowment Model</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Risk Tolerance Classification
              </label>
              <select
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                className="w-full text-xs font-sans bg-white border border-[#12352B]/15 rounded-xl px-3.5 py-2.5 focus:outline-none"
              >
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Growth">Growth</option>
                <option value="Aggressive">Aggressive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Linked Institutions */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#12352B]/8">
            <div>
              <h3 className="text-[22px] font-serif italic text-[#12352B]">
                Linked Custodial Institutions
              </h3>
              <p className="text-xs text-[#68716C] mt-0.5">
                Encrypted API connections with read-only portfolio aggregation.
              </p>
            </div>
            <Landmark className="w-5 h-5 text-[#12352B]" />
          </div>

          <div className="space-y-3">
            {[
              { name: 'Vanguard Custody & Index Funds', account: 'Account ..9012', status: 'Connected', balance: '$61,400' },
              { name: 'J.P. Morgan Private Bank', account: 'Checking ..4821', status: 'Connected', balance: '$42,380' },
              { name: 'Fidelity Active Equities', account: 'Brokerage ..7731', status: 'Connected', balance: '$94,200' },
              { name: 'TreasuryDirect Institutional', account: 'Bonds ..6710', status: 'Connected', balance: '$27,800' },
            ].map((inst, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white rounded-xl border border-[#12352B]/8 flex items-center justify-between"
              >
                <div>
                  <span className="text-sm font-medium text-[#1E2421] block font-sans">
                    {inst.name}
                  </span>
                  <span className="text-xs text-[#68716C]">{inst.account}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-semibold text-[#12352B] tabular-nums">{inst.balance}</span>
                  <span className="inline-flex items-center gap-1 text-[#12352B] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12352B]" />
                    {inst.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification & Intelligence Alerts */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#12352B]/8">
            <div>
              <h3 className="text-[22px] font-serif italic text-[#12352B]">
                Intelligence & Fiduciary Alerts
              </h3>
              <p className="text-xs text-[#68716C] mt-0.5">
                Proactive signals for tax optimization and allocation alignment.
              </p>
            </div>
            <Bell className="w-5 h-5 text-[#12352B]" />
          </div>

          <div className="space-y-4 pt-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={driftAlerts}
                onChange={(e) => setDriftAlerts(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#12352B]/20 text-[#12352B] focus:ring-[#12352B]"
              />
              <div>
                <span className="text-sm font-medium text-[#1E2421] block">Portfolio Drift Warnings</span>
                <span className="text-xs text-[#68716C]">
                  Notify immediately if any asset category drifts beyond ±2.5% of target model.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={monthlyReports}
                onChange={(e) => setMonthlyReports(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#12352B]/20 text-[#12352B] focus:ring-[#12352B]"
              />
              <div>
                <span className="text-sm font-medium text-[#1E2421] block">Automated Monthly Statements</span>
                <span className="text-xs text-[#68716C]">
                  Compile and dispatch the certified Wealthia statement on the first calendar day.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dividendNotices}
                onChange={(e) => setDividendNotices(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#12352B]/20 text-[#12352B] focus:ring-[#12352B]"
              />
              <div>
                <span className="text-sm font-medium text-[#1E2421] block">Dividend Reinvestment Prompts</span>
                <span className="text-xs text-[#68716C]">
                  Recommend tax-efficient distribution channels upon dividend credits.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#12352B]/8">
            <div>
              <h3 className="text-[22px] font-serif italic text-[#12352B]">
                Custody Security
              </h3>
              <p className="text-xs text-[#68716C] mt-0.5">
                Hardware token multi-factor authentication and session authorization.
              </p>
            </div>
            <Shield className="w-5 h-5 text-[#B99A5A]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#12352B]/8">
              <span className="text-[#68716C] block">Two-Factor Authentication</span>
              <span className="font-semibold text-sm text-[#12352B] mt-0.5 block">Hardware Key Enforced (YubiKey)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#12352B]/8">
              <span className="text-[#68716C] block">Session Cryptography</span>
              <span className="font-semibold text-sm text-[#12352B] mt-0.5 block">AES-256-GCM Ephemeral</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#B99A5A]" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
