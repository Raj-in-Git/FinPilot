import {
  PiggyBank,
  Wallet,
  IndianRupee,
  Landmark,
} from "lucide-react";

import MetricCard from "@/features/dashboard/components/MetricCard";
import { dashboardMetrics } from "@/features/dashboard/mocks/dashboardMetrics";
import ExpenseChart from "@/features/dashboard/components/ExpenseChart";

const icons = [
  Landmark,
  IndianRupee,
  Wallet,
  PiggyBank,
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Good Afternoon 👋
        </h1>

        <p className="mt-1 text-muted-foreground">
          Here's an overview of your finances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = icons[index];

          return (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={Icon}
            />
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
            <ExpenseChart />
            <div className="rounded-2xl border bg-card p-6">
                Income Trend
            </div>
      </div>         
    </div>
  );
}