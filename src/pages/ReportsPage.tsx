import { useState } from 'react';
import { FileText, Eye, Download, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ReportItem } from '../types/finance';
import { ReportPreviewModal } from '../components/ReportPreviewModal';

interface ReportsPageProps {
  reports: ReportItem[];
}

export function ReportsPage({ reports }: ReportsPageProps) {
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (report: ReportItem) => {
    const reportText = `=====================================================
WEALTHIA PRIVATE CAPITAL — OFFICIAL FIDUCIARY REPORT
=====================================================
Document: ${report.title}
Period: ${report.period}
Audit Date: ${report.date}
Verification Hash: WTH-${report.id.toUpperCase()}-2026

EXECUTIVE SUMMARY:
${report.description}

AUDIT HIGHLIGHTS:
${report.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

CONSOLIDATED PORTFOLIO BALANCES:
Total Wealth: $284,650.00
Investments: $198,420.00
Cash & Liquidity: $42,380.00
Retirement Sleeve: $43,850.00
Trailing Monthly Return: +4.8% (+$13,050.00)
Sharpe Ratio: 1.84

CONFIDENTIALITY & GOVERNANCE:
This document is prepared solely for the designated account holder.
Wealthia Global Custody & Trust. Certified under SOC-2 Type II standards.
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wealthia-${report.id}-${report.period.replace(/\s+/g, '-').toLowerCase()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice(`Downloaded "${report.title}" statement successfully.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Official Documentation
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Financial Reports
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Fiduciary accounting records, tax schedules, and quarterly asset appreciation statements.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#68716C]">
          <ShieldCheck className="w-4 h-4 text-[#B99A5A]" />
          <span>Fiduciary Verified Statements</span>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 bg-[#12352B]/10 border border-[#12352B]/20 rounded-xl text-xs text-[#12352B] font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#12352B]" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#12352B]/25 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#12352B]/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#12352B]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#B99A5A] font-semibold block">
                      {report.period}
                    </span>
                    <span className="text-xs text-[#68716C]">{report.fileSize}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#68716C]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{report.date}</span>
                </div>
              </div>

              <h3 className="text-[24px] font-serif italic text-[#12352B] mt-4">
                {report.title}
              </h3>

              <p className="text-sm font-sans text-[#68716C] mt-2 leading-relaxed">
                {report.description}
              </p>

              {/* Highlights Bulleted */}
              <div className="mt-4 pt-4 border-t border-[#12352B]/8 space-y-2">
                <span className="text-xs font-semibold text-[#1E2421] block">
                  Document Focus:
                </span>
                {report.highlights.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#68716C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12352B] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Working Visually & Functionally */}
            <div className="mt-7 pt-5 border-t border-[#12352B]/10 flex items-center justify-between gap-3">
              <span className="text-xs text-[#68716C]">
                Audit #{report.id.toUpperCase()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveReport(report)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-xl transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(report)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#B99A5A]" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tax Loss Harvesting & Schedule Statement */}
      <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B99A5A]" />
            <h4 className="text-base font-medium text-[#1E2421]">Custom Date Range Fiduciary Audit</h4>
          </div>
          <p className="text-xs text-[#68716C] max-w-xl">
            Need an itemized capital gains breakdown or Form 1099 consolidated package for external tax filing? Generate an on-demand audit bundle.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (reports[0]) handleDownload(reports[0]);
          }}
          className="px-5 py-2.5 text-xs font-sans font-medium text-[#12352B] bg-white border border-[#12352B]/20 hover:bg-[#F5F1E8] rounded-xl transition-all shrink-0 cursor-pointer"
        >
          Request On-Demand Tax Bundle
        </button>
      </div>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        report={activeReport}
        onClose={() => setActiveReport(null)}
        onDownload={handleDownload}
      />
    </div>
  );
}
