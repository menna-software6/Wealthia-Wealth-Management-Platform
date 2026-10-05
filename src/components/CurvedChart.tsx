import { useState, useId } from 'react';
import { PerformancePoint, TimeFilter } from '../types/finance';
import { PERFORMANCE_DATA } from '../data/mockData';

interface CurvedChartProps {
  initialFilter?: TimeFilter;
  showBenchmark?: boolean;
  height?: number;
}

export function CurvedChart({
  initialFilter = '6M',
  showBenchmark = true,
  height = 320,
}: CurvedChartProps) {
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>(initialFilter);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [enableBenchmark, setEnableBenchmark] = useState(showBenchmark);
  const gradientId = useId();

  const data: PerformancePoint[] = PERFORMANCE_DATA[selectedFilter] || PERFORMANCE_DATA['6M'];

  const values = data.map((d) => d.value);
  const benchmarks = data.map((d) => d.benchmark ?? d.value);
  const allValues = [...values, ...(enableBenchmark ? benchmarks : [])];

  const minValue = Math.min(...allValues) * 0.985;
  const maxValue = Math.max(...allValues) * 1.015;
  const range = maxValue - minValue || 1;

  const width = 800;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 40;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingTop - paddingBottom;

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * plotWidth;
    const y = paddingTop + plotHeight - ((d.value - minValue) / range) * plotHeight;
    return { x, y, data: d };
  });

  const benchmarkPoints = data.map((d, index) => {
    const bmVal = d.benchmark ?? d.value;
    const x = paddingX + (index / (data.length - 1)) * plotWidth;
    const y = paddingTop + plotHeight - ((bmVal - minValue) / range) * plotHeight;
    return { x, y, value: bmVal };
  });

  // Construct smooth bezier curve SVG path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      // Tension factor for smooth wealth growth curves
      const tension = 0.22;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const benchmarkPath = createSmoothPath(benchmarkPoints);

  // Area path closing under baseline
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + plotHeight} L ${points[0].x} ${paddingTop + plotHeight} Z`
    : '';

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  const firstVal = data[0].value;
  const currentVal = activePoint.data.value;
  const diffVal = currentVal - firstVal;
  const diffPercent = ((diffVal / firstVal) * 100).toFixed(2);
  const isPositive = diffVal >= 0;

  return (
    <div className="w-full bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-5 sm:p-7 shadow-xs">
      {/* Top Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#12352B]/8">
        <div>
          <span className="text-[13px] uppercase tracking-wider text-[#68716C] font-medium">
            Portfolio Growth Trajectory
          </span>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-3xl sm:text-4xl font-serif italic text-[#12352B] tracking-tight tabular-nums">
              ${activePoint.data.value.toLocaleString()}
            </span>
            <span
              className={`text-sm font-sans font-medium tabular-nums ${
                isPositive ? 'text-[#12352B]' : 'text-rose-700'
              }`}
            >
              {isPositive ? '+' : ''}${Math.abs(diffVal).toLocaleString()} ({isPositive ? '+' : ''}
              {diffPercent}%)
            </span>
          </div>
          <span className="text-xs text-[#68716C] mt-0.5 block">
            {hoveredIndex !== null ? `Snapshot as of ${activePoint.data.date}` : `Period return for selected window`}
          </span>
        </div>

        {/* Time filters & Benchmark toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setEnableBenchmark(!enableBenchmark)}
            className={`px-3 py-1.5 text-xs font-sans rounded-lg border transition-all ${
              enableBenchmark
                ? 'bg-[#12352B]/5 text-[#12352B] border-[#12352B]/30'
                : 'text-[#68716C] border-transparent hover:text-[#12352B]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#B99A5A] mr-1.5" />
            S&P 500 Index
          </button>

          <div className="flex items-center bg-[#F5F1E8] border border-[#12352B]/10 rounded-lg p-1">
            {(['1M', '3M', '6M', '1Y', 'ALL'] as TimeFilter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setSelectedFilter(filter);
                  setHoveredIndex(null);
                }}
                className={`px-3 py-1 text-xs font-sans font-medium rounded-md transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#12352B] text-[#FAF8F3] shadow-xs'
                    : 'text-[#68716C] hover:text-[#12352B]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Canvas */}
      <div className="relative w-full mt-4" style={{ height: `${height}px` }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id={`${gradientId}-wealth`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12352B" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#12352B" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#12352B" stopOpacity="0" />
            </linearGradient>

            <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#12352B" />
              <stop offset="70%" stopColor="#12352B" />
              <stop offset="100%" stopColor="#B99A5A" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingTop + plotHeight * pct;
            const gridVal = Math.round(maxValue - pct * range);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#12352B"
                  strokeOpacity="0.06"
                  strokeDasharray="4 4"
                />
                <text
                  x={width - paddingX + 6}
                  y={y + 3}
                  fontSize="11"
                  fill="#68716C"
                  fontFamily="Inter, sans-serif"
                  className="tabular-nums"
                >
                  ${(gridVal / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Benchmark line */}
          {enableBenchmark && (
            <path
              d={benchmarkPath}
              fill="none"
              stroke="#B99A5A"
              strokeWidth="1.75"
              strokeDasharray="4 4"
              opacity="0.75"
            />
          )}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#${gradientId}-wealth)`} />

          {/* Main Portfolio Growth Curve */}
          <path
            d={linePath}
            fill="none"
            stroke={`url(#${gradientId}-line)`}
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Interactive vertical crosshair */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={activePoint.x}
                y1={paddingTop}
                x2={activePoint.x}
                y2={paddingTop + plotHeight}
                stroke="#12352B"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5.5"
                fill="#FAF8F3"
                stroke="#12352B"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* X Axis Date labels */}
          {points.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - 12}
              textAnchor="middle"
              fontSize="11"
              fill="#68716C"
              fontFamily="Inter, sans-serif"
            >
              {pt.data.date}
            </text>
          ))}

          {/* Invisible interactive hover slices */}
          {points.map((pt, idx) => {
            const sliceWidth = plotWidth / points.length;
            return (
              <rect
                key={idx}
                x={pt.x - sliceWidth / 2}
                y={paddingTop}
                width={sliceWidth}
                height={plotHeight}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredIndex(idx)}
              />
            );
          })}
        </svg>
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 mt-3 border-t border-[#12352B]/8 text-xs">
        <div>
          <span className="text-[#68716C] block">Cost Basis</span>
          <span className="font-semibold text-[#1E2421] tabular-nums mt-0.5 block">
            ${activePoint.data.invested.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-[#68716C] block">Unrealized Alpha</span>
          <span className="font-semibold text-[#12352B] tabular-nums mt-0.5 block">
            +${(activePoint.data.value - activePoint.data.invested).toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-[#68716C] block">Sharpe Ratio</span>
          <span className="font-semibold text-[#1E2421] tabular-nums mt-0.5 block">1.84 (High Tier)</span>
        </div>
        <div>
          <span className="text-[#68716C] block">Volatility Delta</span>
          <span className="font-semibold text-[#1E2421] tabular-nums mt-0.5 block">4.2% Max Drawdown</span>
        </div>
      </div>
    </div>
  );
}
