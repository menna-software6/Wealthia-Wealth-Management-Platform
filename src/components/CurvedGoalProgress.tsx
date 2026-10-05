import { FinancialGoal } from '../types/finance';

interface CurvedGoalProgressProps {
  goal: FinancialGoal;
  onContribute?: (goalId: string) => void;
}

export function CurvedGoalProgress({ goal, onContribute }: CurvedGoalProgressProps) {
  const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  // SVG Arch Dimensions
  const width = 160;
  const height = 95;
  const strokeWidth = 10;
  const r = 65;
  const cx = 80;
  const cy = 80;

  // Arc length for semicircle (pi * r)
  const arcLength = Math.PI * r;
  const filledDash = (percent / 100) * arcLength;

  return (
    <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#12352B]/25 transition-all">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium">
            {goal.category}
          </span>
          <h4 className="text-[22px] font-serif italic text-[#12352B] mt-0.5">
            {goal.name}
          </h4>
        </div>
        <span className="text-xs font-sans font-medium text-[#12352B] bg-[#12352B]/5 px-2.5 py-1 rounded-md border border-[#12352B]/10">
          Due {goal.targetDate}
        </span>
      </div>

      {/* Curved Arc Gauge */}
      <div className="flex flex-col items-center justify-center my-4 relative">
        <svg width={width} height={height} className="overflow-visible">
          <defs>
            <linearGradient id={`grad-${goal.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#12352B" />
              <stop offset="65%" stopColor="#12352B" />
              <stop offset="100%" stopColor="#B99A5A" />
            </linearGradient>
          </defs>

          {/* Background Arch Track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#12352B"
            strokeOpacity="0.08"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Filled Progress Arc */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke={`url(#grad-${goal.id})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${filledDash} ${arcLength}`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Readout inside Arc */}
        <div className="text-center -mt-8">
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums block">
            {percent}%
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#68716C] -mt-1 block font-medium">
            Fulfilled
          </span>
        </div>
      </div>

      {/* Values & Progress Details */}
      <div className="space-y-3 pt-3 border-t border-[#12352B]/8">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#68716C]">Current Capital</span>
          <span className="font-semibold text-[#1E2421] tabular-nums">
            ${goal.currentAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#68716C]">Target Milestone</span>
          <span className="font-medium text-[#68716C] tabular-nums">
            ${goal.targetAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#68716C]">Remaining</span>
          <span className="font-semibold text-[#12352B] tabular-nums">
            ${remaining.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#68716C]">
            Pace: <strong className="font-medium text-[#1E2421] tabular-nums">${goal.monthlyContribution}/mo</strong>
          </span>
          {onContribute && (
            <button
              type="button"
              onClick={() => onContribute(goal.id)}
              className="text-xs font-sans font-medium text-[#12352B] hover:text-[#B99A5A] transition-colors cursor-pointer"
            >
              + Add Capital
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
