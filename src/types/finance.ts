export type TimeFilter = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export type NavigationPage =
  | 'landing'
  | 'dashboard'
  | 'portfolio'
  | 'investments'
  | 'transactions'
  | 'goals'
  | 'analytics'
  | 'reports'
  | 'settings';

export interface PerformancePoint {
  date: string;
  value: number;
  invested: number;
  benchmark?: number;
}

export interface AssetCategory {
  id: string;
  name: string;
  value: number;
  allocationPercent: number;
  targetPercent: number;
  changePercent: number;
  color: string;
  riskLevel: 'Low' | 'Moderate' | 'Balanced' | 'Growth' | 'High';
  assetCount: number;
}

export interface InvestmentItem {
  id: string;
  name: string;
  ticker: string;
  category: 'Stocks' | 'ETFs' | 'Funds' | 'Bonds' | 'Real Estate';
  currentValue: number;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  performancePercent: number;
  allocationPercent: number;
  risk: 'Low' | 'Moderate' | 'Balanced' | 'Growth' | 'High';
  unrealizedGain: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  amount: number;
  status: 'Completed' | 'Pending';
  type: 'credit' | 'debit';
}

export interface FinancialGoal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  monthlyContribution: number;
  category: string;
}

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  date: string;
  period: string;
  type: 'wealth' | 'performance' | 'tax' | 'annual';
  fileSize: string;
  highlights: string[];
}

export interface MonthlyCashFlow {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
}
