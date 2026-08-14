import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import AccountsPage from "@/pages/Accounts/AccountsPage";
import TransactionsPage from "@/pages/Transactions/TransactionsPage";
import BudgetsPage from "@/pages/Budget/BudgetsPage";
import GoalsPage from "@/pages/Goals/GoalsPage";
import ReportsPage from "@/pages/Reports/ReportsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "accounts",
        element: <AccountsPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "budgets",
        element: <BudgetsPage />,
      },
      {
        path: "goals",
        element: <GoalsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
    ],
  },
]);