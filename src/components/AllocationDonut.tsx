import { useState } from 'react';
import { AssetCategory } from '../types/finance';
import { ASSET_CATEGORIES } from '../data/mockData';

interface AllocationDonutProps {
  categories?: AssetCategory[];
  showLegend?: boolean;
}

export function AllocationDonut({
  categories = ASSET_CATEGORIES,
  showLegend = true,
}: AllocationDonutProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const totalValue = categories.reduce((sum, item) => sum + item.value, 0);

  // Calculate SVG arc parameters
  const size = 260;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const segments = categories.map((cat) => {
    const percent = (cat.value / totalValue) * 100;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += percent;
    return {
      ...cat,
      percent,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const activeCategory = hoveredId
    ? categories.find((c) => c.id === hoveredId)
    : null;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
      {/* SVG Arc Ring */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Subtle background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#12352B"
            strokeOpacity="0.06"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {segments.map((seg) => {
            const isHovered = hoveredId === seg.id;
            return (
              <circle
                key={seg.id}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="butt"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          {activeCategory ? (
            <>
              <span className="text-xs uppercase tracking-wider text-[#68716C]">
                {activeCategory.name}
              </span>
              <span className="text-2xl font-serif italic text-[#12352B] tabular-nums mt-0.5">
                ${activeCategory.value.toLocaleString()}
              </span>
              <span className="text-xs font-sans text-[#12352B] font-medium mt-0.5">
                {activeCategory.allocationPercent}% of wealth
              </span>
            </>
          ) : (
            <>
              <span className="text-xs uppercase tracking-wider text-[#68716C]">
                Total Assets
              </span>
              <span className="text-2xl font-serif italic text-[#12352B] tabular-nums mt-0.5">
                ${totalValue.toLocaleString()}
              </span>
              <span className="text-xs font-sans text-[#68716C] mt-0.5">
                {categories.length} asset classes
              </span>
            </>
          )}
        </div>
      </div>

      {/* Legend & Breakdown */}
      {showLegend && (
        <div className="w-full space-y-3">
          {categories.map((cat) => {
            const isHovered = hoveredId === cat.id;
            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isHovered
                    ? 'bg-white border-[#12352B]/30 shadow-xs'
                    : 'bg-[#FAF8F3] border-[#12352B]/8 hover:border-[#12352B]/20'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-[#1E2421] truncate block">
                      {cat.name}
                    </span>
                    <span className="text-xs text-[#68716C] block">
                      Target {cat.targetPercent}% · Risk: {cat.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-semibold text-[#12352B] tabular-nums block">
                    ${cat.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#68716C] tabular-nums">
                    {cat.allocationPercent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
