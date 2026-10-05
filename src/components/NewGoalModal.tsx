import { useState } from 'react';
import { X, Target } from 'lucide-react';
import { FinancialGoal } from '../types/finance';

interface NewGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: FinancialGoal) => void;
}

export function NewGoalModal({ isOpen, onClose, onAddGoal }: NewGoalModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Property');
  const [targetAmountStr, setTargetAmountStr] = useState('');
  const [currentAmountStr, setCurrentAmountStr] = useState('');
  const [targetDate, setTargetDate] = useState('Dec 2028');
  const [monthlyContributionStr, setMonthlyContributionStr] = useState('500');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAmount = parseFloat(targetAmountStr) || 0;
    const currentAmount = parseFloat(currentAmountStr) || 0;
    const monthlyContribution = parseFloat(monthlyContributionStr) || 100;

    if (!name.trim() || targetAmount <= 0) return;

    const newGoal: FinancialGoal = {
      id: `goal-${Date.now()}`,
      name: name.trim(),
      category,
      targetAmount,
      currentAmount,
      targetDate,
      monthlyContribution,
    };

    onAddGoal(newGoal);
    onClose();
    setName('');
    setTargetAmountStr('');
    setCurrentAmountStr('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B241D]/60 backdrop-blur-sm">
      <div className="bg-[#FAF8F3] border border-[#12352B]/15 rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between pb-5 border-b border-[#12352B]/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#68716C] font-semibold">
              Wealth Milestone
            </span>
            <h3 className="text-2xl font-serif italic text-[#12352B] mt-0.5">
              Establish New Financial Goal
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
          <div>
            <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
              Goal Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vacation Villa, Angel Fund, Commercial Real Estate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Target Amount ($)
              </label>
              <input
                type="number"
                step="100"
                min="500"
                required
                placeholder="50000"
                value={targetAmountStr}
                onChange={(e) => setTargetAmountStr(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-sans bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors tabular-nums"
              />
            </div>

            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Current Capital ($)
              </label>
              <input
                type="number"
                step="100"
                min="0"
                placeholder="5000"
                value={currentAmountStr}
                onChange={(e) => setCurrentAmountStr(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-sans bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Target Completion Date
              </label>
              <input
                type="text"
                placeholder="e.g. Dec 2028"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-sans font-medium text-[#1E2421] block mb-1.5">
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                step="50"
                min="10"
                value={monthlyContributionStr}
                onChange={(e) => setMonthlyContributionStr(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-sans bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors tabular-nums"
              />
            </div>
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
              <option value="Security">Security & Reserves</option>
              <option value="Property">Real Estate & Property</option>
              <option value="Lifestyle">Lifestyle & Travel</option>
              <option value="Independence">Independence & Retirement</option>
              <option value="Venture">Venture & Angel</option>
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
              <Target className="w-3.5 h-3.5" />
              <span>Create Milestone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
