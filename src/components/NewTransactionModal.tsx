import { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { Transaction } from '../types/finance';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Transaction) => void;
}

export function NewTransactionModal({
  isOpen,
  onClose,
  onAddTransaction,
}: NewTransactionModalProps) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Investment Deposit');
  const [account, setAccount] = useState('Wealthia Core Portfolio (..9012)');
  const [amountStr, setAmountStr] = useState('');
  const [type, setType] = useState<'credit' | 'debit'>('credit');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = Math.abs(parseFloat(amountStr) || 0);
    if (!description.trim() || parsedAmount <= 0) return;

    const finalAmount = type === 'credit' ? parsedAmount : -parsedAmount;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: dateFormatted,
      description: description.trim(),
      category,
      account,
      amount: finalAmount,
      status: 'Completed',
      type,
    };

    onAddTransaction(newTx);
    onClose();
    setDescription('');
    setAmountStr('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B241D]/60 backdrop-blur-sm">
      <div className="bg-[#FAF8F3] border border-[#12352B]/15 rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between pb-5 border-b border-[#12352B]/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#68716C] font-semibold">
              Ledger Entry
            </span>
            <h3 className="text-2xl font-serif italic text-[#12352B] mt-0.5">
              Record Transaction
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#68716C] hover:text-[#12352B] hover:bg-[#12352B]/5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          {/* Credit or Debit selector */}
          <div className="flex items-center gap-2 p-1 bg-[#F5F1E8] rounded-xl border border-[#12352B]/10">
            <button
              type="button"
              onClick={() => setType('credit')}
              className={`flex-1 py-2 text-xs font-sans font-medium rounded-lg transition-all ${
                type === 'credit'
                  ? 'bg-[#12352B] text-[#FAF8F3] shadow-xs'
                  : 'text-[#68716C] hover:text-[#12352B]'
              }`}
            >
              + Inflow (Credit)
            </button>
            <button
              type="button"
              onClick={() => setType('debit')}
              className={`flex-1 py-2 text-xs font-sans font-medium rounded-lg transition-all ${
                type === 'debit'
                  ? 'bg-[#12352B] text-[#FAF8F3] shadow-xs'
                  : 'text-[#68716C] hover:text-[#12352B]'
              }`}
            >
              - Outflow (Debit)
            </button>
          </div>

          <div>
            <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
              Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dividend — Treasury Bonds, Apple Store, Client Retainer"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Amount (USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="2500.00"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-sans bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors tabular-nums"
              />
            </div>

            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
              >
                <option value="Investment Deposit">Investment Deposit</option>
                <option value="Salary">Salary</option>
                <option value="Dividend">Dividend</option>
                <option value="Rent">Rent</option>
                <option value="Technology">Technology</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transfer">Transfer</option>
                <option value="Advisory">Advisory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
              Account
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
            >
              <option value="Wealthia Core Portfolio (..9012)">Wealthia Core Portfolio (..9012)</option>
              <option value="High-Yield Checking (..4821)">High-Yield Checking (..4821)</option>
              <option value="Titanium Card (..1094)">Titanium Card (..1094)</option>
              <option value="Treasury Direct (..6710)">Treasury Direct (..6710)</option>
              <option value="Private Vault (..3301)">Private Vault (..3301)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#12352B]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-sans font-medium text-[#68716C] hover:text-[#12352B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Record Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
