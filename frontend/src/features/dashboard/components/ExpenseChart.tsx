import { Pie, PieChart } from "recharts";

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

export default function ExpenseChart() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const categoryTotals = expenseTransactions.reduce<
    Record<string, number>
  >((totals, transaction) => {
    totals[transaction.category] =
      (totals[transaction.category] ?? 0) +
      transaction.amount;

    return totals;
  }, {});

  const chartData = Object.entries(categoryTotals).map(
    ([category, amount], index) => ({
      category,
      amount,
      fill: `var(--chart-${(index % 5) + 1})`,
    })
  );

  const chartConfig = chartData.reduce(
    (config, item) => ({
      ...config,
      [item.category]: {
        label: item.category,
        color: item.fill,
      },
    }),
    {
      amount: {
        label: "Expenses",
      },
    } as Record<string, { label: string; color?: string }>
  );

  const totalExpenses = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>

        <CardDescription>
          Spending by category
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
            No expense data yet.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[320px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString("en-IN")}`
                    }
                  />
                }
              />

              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={70}
                strokeWidth={2}
              />
            </PieChart>
          </ChartContainer>
        )}

        {totalExpenses > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Total Expenses
            </p>

            <p className="text-2xl font-bold">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}