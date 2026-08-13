import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  Target,
  BarChart3,
  Settings,
} from "lucide-react";

import type { NavigationItem } from "@/types/navigation";

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Accounts",
    to: "/accounts",
    icon: Wallet,
  },
  {
    label: "Transactions",
    to: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Budget",
    to: "/budget",
    icon: PiggyBank,
  },
  {
    label: "Goals",
    to: "/goals",
    icon: Target,
  },
  {
    label: "Reports",
    to: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];