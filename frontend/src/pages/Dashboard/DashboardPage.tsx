import {
  PiggyBank,
  Wallet,
  IndianRupee,
  Landmark,
} from "lucide-react";

import MetricCard from "@/features/dashboard/components/MetricCard";

import { useAccountStore } from "@/features/accounts/store/accountStore";
import { useTransactionStore } from "@/features/transactions/store/transactionStore";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";
import ExpenseChart from "@/features/dashboard/components/ExpenseChart";
import IncomeExpenseChart from "@/features/dashboard/components/IncomeExpenseChart";

export default function DashboardPage() {
  const accounts = useAccountStore(
    (state) => state.accounts
  );

  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  // -----------------------------
  // Financial Calculations
  // -----------------------------

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  const savings = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Good Evening 👋
        </h1>

        <p className="mt-1 text-muted-foreground">
          Here's an overview of your finances.
        </p>
      </div>

      {/* Metrics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Balance"
          value={totalBalance}
          change={0}
          trend="up"
          icon={Landmark}
        />

        <MetricCard
          title="Income"
          value={totalIncome}
          change={0}
          trend="up"
          icon={IndianRupee}
        />

        <MetricCard
          title="Expenses"
          value={totalExpenses}
          change={0}
          trend="down"
          icon={Wallet}
        />

        <MetricCard
          title="Savings"
          value={savings}
          change={0}
          trend={savings >= 0 ? "up" : "down"}
          icon={PiggyBank}
        />      
      </div>
      {/* Recent Transactions */}
        <RecentTransactions />
      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseChart />

        <IncomeExpenseChart />
      </div>
    </div>
  );
}