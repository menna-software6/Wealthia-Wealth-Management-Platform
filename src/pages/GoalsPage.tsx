import { useState } from 'react';
import { Target, Plus, CheckCircle, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { FinancialGoal } from '../types/finance';
import { CurvedGoalProgress } from '../components/CurvedGoalProgress';

interface GoalsPageProps {
  goals: FinancialGoal[];
  onOpenNewGoal: () => void;
  onContributeToGoal: (goalId: string, amount: number) => void;
}

export function GoalsPage({ goals, onOpenNewGoal, onContributeToGoal }: GoalsPageProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<string>(goals[0]?.id || '');
  const [contributionInput, setContributionInput] = useState<string>('500');
  const [contributionSuccess, setContributionSuccess] = useState<string | null>(null);

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalRemaining = totalTarget - totalSaved;
  const overallPercent = Math.round((totalSaved / totalTarget) * 100);

  const selectedGoal = goals.find((g) => g.id === selectedGoalId) || goals[0];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(contributionInput) || 0;
    if (amount <= 0 || !selectedGoal) return;

    onContributeToGoal(selectedGoal.id, amount);
    setContributionSuccess(`Successfully deposited $${amount.toLocaleString()} into ${selectedGoal.name}.`);
    setTimeout(() => setContributionSuccess(null), 3500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Capital Horizons
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Financial Goals
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Intentional milestones structured around your personal life milestones and retirement independence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenNewGoal}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#B99A5A]" />
            <span>Establish New Milestone</span>
          </button>
        </div>
      </div>

      {/* Aggregate Horizon Banner with Organic Curve */}
      <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B99A5A]" />
              <span className="text-xs uppercase tracking-wider text-[#68716C] font-semibold">
                Consolidated Milestones Progress
              </span>
            </div>

            <h2 className="text-[32px] sm:text-[40px] font-serif italic text-[#12352B] leading-tight">
              ${totalSaved.toLocaleString()} achieved of ${totalTarget.toLocaleString()}
            </h2>

            <p className="text-sm font-sans text-[#68716C] max-w-2xl leading-relaxed">
              You are currently <strong className="text-[#12352B]">{overallPercent}%</strong> of the way toward your aggregate financial milestones. At the current combined contribution rate, all targets remain on track for scheduled realization.
            </p>

            {/* Smooth progress bar */}
            <div className="space-y-2 pt-2 max-w-xl">
              <div className="h-3 w-full bg-[#12352B]/8 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#12352B] to-[#B99A5A] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#68716C]">
                <span>Accumulated: ${totalSaved.toLocaleString()}</span>
                <span>Remaining: ${totalRemaining.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F5F1E8] border border-[#12352B]/10 rounded-2xl p-6 space-y-4">
            <span className="text-xs uppercase tracking-wider text-[#68716C] font-semibold block">
              Quick Capital Allocation
            </span>

            {contributionSuccess && (
              <div className="p-3 bg-[#12352B]/10 border border-[#12352B]/20 rounded-xl text-xs text-[#12352B] font-medium animate-in fade-in duration-200">
                {contributionSuccess}
              </div>
            )}

            <form onSubmit={handleDeposit} className="space-y-3">
              <div>
                <label className="text-xs text-[#68716C] block mb-1">Target Milestone</label>
                <select
                  value={selectedGoalId}
                  onChange={(e) => setSelectedGoalId(e.target.value)}
                  className="w-full text-xs font-sans bg-white border border-[#12352B]/15 rounded-xl px-3 py-2 focus:outline-none"
                >
                  {goals.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} (${g.currentAmount.toLocaleString()} / ${g.targetAmount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#68716C] block mb-1">Deposit Amount ($)</label>
                <div className="flex items-center gap-2">
                  {[200, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setContributionInput(amt.toString())}
                      className="px-2.5 py-1 text-xs bg-white border border-[#12352B]/10 rounded-lg hover:border-[#12352B]/30 transition-colors"
                    >
                      +${amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  step="50"
                  value={contributionInput}
                  onChange={(e) => setContributionInput(e.target.value)}
                  className="w-full mt-2 text-xs font-sans bg-white border border-[#12352B]/15 rounded-xl px-3 py-2 focus:outline-none tabular-nums"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Deposit Capital Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Curved Goal Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] sm:text-[34px] font-serif italic text-[#12352B]">
            Active Milestone Arcs
          </h2>
          <span className="text-xs text-[#68716C]">
            {goals.length} milestones active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal) => (
            <CurvedGoalProgress
              key={goal.id}
              goal={goal}
              onContribute={(id) => {
                setSelectedGoalId(id);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* Strategic Milestone Horizons Table */}
      <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="pb-3 border-b border-[#12352B]/10 flex items-center justify-between">
          <div>
            <h3 className="text-[22px] font-serif italic text-[#12352B]">
              Milestone Projection Timeline
            </h3>
            <p className="text-xs text-[#68716C] mt-0.5">
              Calculated based on scheduled monthly contributions and historical conservative interest yield (4.5% APY).
            </p>
          </div>
          <Calendar className="w-5 h-5 text-[#12352B]" />
        </div>

        <div className="divide-y divide-[#12352B]/8">
          {goals.map((goal) => {
            const remaining = goal.targetAmount - goal.currentAmount;
            const monthsToGoal = Math.ceil(remaining / goal.monthlyContribution);
            return (
              <div key={goal.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#1E2421]">{goal.name}</span>
                    <span className="text-xs text-[#68716C]">· {goal.category}</span>
                  </div>
                  <span className="text-xs text-[#68716C] mt-0.5 block">
                    Paced at ${goal.monthlyContribution}/month · Target date: {goal.targetDate}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-[#68716C] block">Time Remaining</span>
                    <span className="font-semibold text-[#12352B] tabular-nums mt-0.5 block">
                      ~{monthsToGoal} months
                    </span>
                  </div>
                  <div>
                    <span className="text-[#68716C] block">Status</span>
                    <span className="font-medium text-[#12352B] mt-0.5 block">
                      On Track
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
