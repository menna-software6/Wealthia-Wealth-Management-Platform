import { useState, useMemo } from 'react';
import { Search, Plus, Download, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { Transaction } from '../types/finance';

interface TransactionsPageProps {
  transactions: Transaction[];
  onOpenNewTransaction: () => void;
}

export function TransactionsPage({
  transactions,
  onOpenNewTransaction,
}: TransactionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<'all' | 'credit' | 'debit'>('all');

  const categories = [
    'All',
    'Salary',
    'Rent',
    'Technology',
    'Dividend',
    'Investment Deposit',
    'Transfer',
    'Entertainment',
    'Advisory',
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.account.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || tx.category === selectedCategory;
      const matchesType =
        selectedType === 'all' || tx.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, searchTerm, selectedCategory, selectedType]);

  const totalInflows = filteredTransactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalOutflows = filteredTransactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Account', 'Amount', 'Status'];
    const rows = filteredTransactions.map((tx) => [
      `"${tx.date}"`,
      `"${tx.description.replace(/"/g, '""')}"`,
      `"${tx.category}"`,
      `"${tx.account}"`,
      `"${tx.amount.toFixed(2)}"`,
      `"${tx.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wealthia-transactions-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#12352B]/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold block">
            Custody Ledger
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-serif italic text-[#12352B] leading-tight">
            Transaction Activity
          </h1>
          <p className="text-sm font-sans text-[#68716C] mt-1">
            Audited records of inflows, portfolio disbursements, dividends, and living allocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#12352B] bg-[#F5F1E8] hover:bg-[#EAE4D7] border border-[#12352B]/15 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={onOpenNewTransaction}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-medium text-[#FAF8F3] bg-[#12352B] hover:bg-[#0B241D] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#B99A5A]" />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Ledger Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Filtered Total Inflows
          </span>
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums mt-1 block">
            +${totalInflows.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-[#68716C] mt-1 block">
            Dividends, salary, and capital injections
          </span>
        </div>

        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Filtered Total Outflows
          </span>
          <span className="text-3xl font-serif italic text-[#1E2421] tabular-nums mt-1 block">
            -${totalOutflows.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-[#68716C] mt-1 block">
            Living expenditures, transfers, and investments
          </span>
        </div>

        <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6">
          <span className="text-xs uppercase tracking-wider text-[#68716C] font-medium block">
            Net Cash Flow Delta
          </span>
          <span className="text-3xl font-serif italic text-[#12352B] tabular-nums mt-1 block">
            +${(totalInflows - totalOutflows).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-[#12352B] font-medium mt-1 block">
            Positive net retained capital
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#68716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search description, category, or account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#12352B]/15 rounded-xl focus:outline-none focus:border-[#12352B] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#F5F1E8] border border-[#12352B]/10 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-all ${
                  selectedType === 'all'
                    ? 'bg-[#12352B] text-[#FAF8F3] font-medium'
                    : 'text-[#68716C] hover:text-[#12352B]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('credit')}
                className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-all ${
                  selectedType === 'credit'
                    ? 'bg-[#12352B] text-[#FAF8F3] font-medium'
                    : 'text-[#68716C] hover:text-[#12352B]'
                }`}
              >
                Credits (+)
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('debit')}
                className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-all ${
                  selectedType === 'debit'
                    ? 'bg-[#12352B] text-[#FAF8F3] font-medium'
                    : 'text-[#68716C] hover:text-[#12352B]'
                }`}
              >
                Debits (-)
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills / Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#12352B]/8">
          <span className="text-xs text-[#68716C] mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-sans rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#12352B] text-[#FAF8F3] font-medium'
                  : 'text-[#68716C] hover:text-[#12352B] hover:bg-[#12352B]/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Financial Transaction Table */}
      <div className="bg-[#FAF8F3] border border-[#12352B]/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-sans border-collapse">
            <thead>
              <tr className="bg-[#F5F1E8] border-b border-[#12352B]/10 text-xs font-semibold text-[#68716C] uppercase tracking-wider">
                <th className="py-4 px-4 sm:px-6">Date</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Account</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12352B]/8 text-[#1E2421]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#68716C]">
                    No transactions match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isCredit = tx.amount > 0;
                  return (
                    <tr key={tx.id} className="hover:bg-white/80 transition-colors">
                      <td className="py-4 px-4 sm:px-6 text-xs text-[#68716C] whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-4 px-4 font-medium text-[#1E2421]">
                        {tx.description}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-[#12352B] bg-[#12352B]/5 px-2.5 py-1 rounded-md">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-[#68716C]">
                        {tx.account}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`font-semibold tabular-nums ${
                            isCredit ? 'text-[#12352B]' : 'text-[#1E2421]'
                          }`}
                        >
                          {isCredit ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#12352B] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#12352B]" />
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
