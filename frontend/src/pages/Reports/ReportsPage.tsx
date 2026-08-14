import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useTransactionStore } from "@/features/transactions/store/transactionStore";

export default function ReportsPage() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const savings = income - expenses;

  const categoryTotals = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce<Record<string, number>>(
      (totals, transaction) => {
        totals[transaction.category] =
          (totals[transaction.category] ?? 0) +
          transaction.amount;

        return totals;
      },
      {}
    );

  const categories = Object.entries(categoryTotals).sort(
    ([, amountA], [, amountB]) => amountB - amountA
  );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="mt-1 text-muted-foreground">
          Understand where your money is going.
        </p>
      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Income
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              +₹{income.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Expenses
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              -₹{expenses.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Net Savings
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${
                savings >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {savings >= 0 ? "+" : "-"}₹
              {Math.abs(savings).toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories */}

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Expenses by Category
          </CardTitle>
        </CardHeader>

        <CardContent>
          {categories.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No expense data yet.
            </div>
          ) : (
            <div className="space-y-5">
              {categories.map(([category, amount]) => {
                const percentage =
                  expenses > 0
                    ? Math.round(
                        (amount / expenses) * 100
                      )
                    : 0;

                return (
                  <div key={category}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {category}
                      </span>

                      <span className="text-sm">
                        ₹
                        {amount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {percentage}% of total expenses
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}