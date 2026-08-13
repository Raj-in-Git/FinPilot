import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
}

export default function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: MetricCardProps) {
  const positive = trend === "up";

  return (
    <Card className="rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {formatCurrency(value)}
            </h2>
          </div>

          <div className="rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          {positive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}

          <span
            className={cn(
              "text-sm font-medium",
              positive ? "text-green-600" : "text-red-600"
            )}
          >
            {Math.abs(change)}%
          </span>

          <span className="text-sm text-muted-foreground">
            vs last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}