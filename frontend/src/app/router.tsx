import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import AccountsPage from "@/pages/Accounts/AccountsPage";

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
    ],
  },
]);