import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useTransactionStore } from "@/features/transactions/store/transactionStore";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-1)",
  },
};

export default function IncomeExpenseChart() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const monthlyData = transactions.reduce<
    Record<string, { income: number; expenses: number }>
  >((result, transaction) => {
    const month = transaction.date.slice(0, 7);

    if (!result[month]) {
      result[month] = {
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "income") {
      result[month].income += transaction.amount;
    } else {
      result[month].expenses += transaction.amount;
    }

    return result;
  }, {});

  const chartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, values]) => ({
      month,
      ...values,
    }));

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>

        <CardDescription>
          Monthly financial activity
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
            No transaction data yet.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-[320px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString("en-IN")}`
                    }
                  />
                }
              />

              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="var(--color-expenses)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}