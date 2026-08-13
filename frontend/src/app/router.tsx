import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/Dashboard/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
]);