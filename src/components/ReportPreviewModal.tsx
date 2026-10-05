import { X, Download, Printer, CheckCircle2, Shield } from 'lucide-react';
import { ReportItem } from '../types/finance';

interface ReportPreviewModalProps {
  report: ReportItem | null;
  onClose: () => void;
  onDownload: (report: ReportItem) => void;
}

export function ReportPreviewModal({ report, onClose, onDownload }: ReportPreviewModalProps) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B241D]/60 backdrop-blur-sm">
      <div className="bg-[#FAF8F3] border border-[#12352B]/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#12352B]/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#B99A5A] font-semibold">
              Official Wealthia Statement · {report.period}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif italic text-[#12352B] mt-1">
              {report.title}
            </h3>
            <span className="text-xs text-[#68716C] mt-1 block">
              Issued on {report.date} · Verified Audit #{report.id.toUpperCase()}-2026
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#68716C] hover:text-[#12352B] hover:bg-[#12352B]/5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Statement Body */}
        <div className="py-6 space-y-6">
          <div className="bg-[#F5F1E8] p-5 rounded-xl border border-[#12352B]/10">
            <h4 className="text-xs uppercase tracking-wider text-[#68716C] font-semibold mb-2">
              Executive Summary
            </h4>
            <p className="text-sm font-sans text-[#1E2421] leading-relaxed">
              {report.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-serif italic text-[#12352B] text-lg mb-3">
              Key Audit Highlights & Metrics
            </h4>
            <div className="space-y-2.5">
              {report.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#12352B]/8">
                  <CheckCircle2 className="w-4 h-4 text-[#12352B] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#1E2421] font-sans">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Compliance Seal */}
          <div className="flex items-center gap-3 p-4 bg-[#12352B]/5 rounded-xl border border-[#12352B]/10 text-xs text-[#68716C]">
            <Shield className="w-5 h-5 text-[#B99A5A] shrink-0" />
            <span>
              Cryptographically signed by Wealthia Global Custody. All assets recorded under strict fiduciary protocols.
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#12352B]/10">
          <span className="text-xs text-[#68716C] font-sans">
            File format: {report.fileSize}
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#12352B] bg-white border border-[#12352B]/20 hover:bg-[#F5F1E8] rounded-xl transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={() => onDownload(report)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
