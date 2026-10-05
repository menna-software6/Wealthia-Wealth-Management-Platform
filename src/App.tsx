import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AssetCategory,
  FinancialGoal,
  InvestmentItem,
  NavigationPage,
  ReportItem,
  Transaction,
} from './types/finance';
import {
  ASSET_CATEGORIES,
  INITIAL_GOALS,
  INITIAL_INVESTMENTS,
  INITIAL_TRANSACTIONS,
  REPORTS_LIST,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NewTransactionModal } from './components/NewTransactionModal';
import { NewGoalModal } from './components/NewGoalModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { InvestmentsPage } from './pages/InvestmentsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { GoalsPage } from './pages/GoalsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  // Sync page state with window hash for GitHub Pages resilience
  const getInitialPage = (): NavigationPage => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages: NavigationPage[] = [
      'landing',
      'dashboard',
      'portfolio',
      'investments',
      'transactions',
      'goals',
      'analytics',
      'reports',
      'settings',
    ];
    if (validPages.includes(hash as NavigationPage)) {
      return hash as NavigationPage;
    }
    return 'landing';
  };

  const [currentPage, setCurrentPage] = useState<NavigationPage>(getInitialPage());
  const [categories, setCategories] = useState<AssetCategory[]>(ASSET_CATEGORIES);
  const [investments, setInvestments] = useState<InvestmentItem[]>(INITIAL_INVESTMENTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState<FinancialGoal[]>(INITIAL_GOALS);
  const [reports] = useState<ReportItem[]>(REPORTS_LIST);

  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false);
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  // Sync hash change
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'landing' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);

    // Update categories and cash allocation dynamically
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === 'cash') {
          return {
            ...cat,
            value: Math.max(0, cat.value + newTx.amount),
          };
        }
        return cat;
      })
    );
  };

  const handleAddGoal = (newGoal: FinancialGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleContributeToGoal = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            currentAmount: g.currentAmount + amount,
          };
        }
        return g;
      })
    );

    // Also record as a transaction debit to reflect in ledger
    const now = new Date();
    const targetGoal = goals.find((g) => g.id === goalId);
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const goalTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: dateFormatted,
      description: `Goal Allocation — ${targetGoal?.name || 'Milestone Reserve'}`,
      category: 'Transfer',
      account: 'High-Yield Checking (..4821)',
      amount: -amount,
      status: 'Completed',
      type: 'debit',
    };

    setTransactions((prev) => [goalTx, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1E2421] selection:bg-[#12352B] selection:text-[#FAF8F3]">
      {/* Top Bar Navigation */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page View with Smooth Fade Transition */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentPage === 'landing' && (
              <LandingPage onNavigate={navigateTo} />
            )}

            {currentPage === 'dashboard' && (
              <DashboardPage
                categories={categories}
                transactions={transactions}
                goals={goals}
                onNavigate={navigateTo}
                onOpenNewTransaction={() => setIsNewTxModalOpen(true)}
                onOpenNewGoal={() => setIsNewGoalModalOpen(true)}
              />
            )}

            {currentPage === 'portfolio' && (
              <PortfolioPage
                categories={categories}
                investments={investments}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'investments' && (
              <InvestmentsPage
                investments={investments}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'transactions' && (
              <TransactionsPage
                transactions={transactions}
                onOpenNewTransaction={() => setIsNewTxModalOpen(true)}
              />
            )}

            {currentPage === 'goals' && (
              <GoalsPage
                goals={goals}
                onOpenNewGoal={() => setIsNewGoalModalOpen(true)}
                onContributeToGoal={handleContributeToGoal}
              />
            )}

            {currentPage === 'analytics' && <AnalyticsPage />}

            {currentPage === 'reports' && <ReportsPage reports={reports} />}

            {currentPage === 'settings' && <SettingsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Brand Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Record Transaction Modal */}
      <NewTransactionModal
        isOpen={isNewTxModalOpen}
        onClose={() => setIsNewTxModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      {/* Interactive New Milestone Modal */}
      <NewGoalModal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
}
