import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import { useTransactionStore } from "@/features/transactions/store/transactionStore";

import AddBudgetDialog from "@/features/budgets/components/AddBudgetDialog";

export default function BudgetsPage() {
  const budgets = useBudgetStore(
    (state) => state.budgets
  );

  const deleteBudget = useBudgetStore(
    (state) => state.deleteBudget
  );

  const transactions = useTransactionStore(
    (state) => state.transactions
  );

 

  const getSpent = (
  category: string,
  month: string
) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.category === category &&
          transaction.date.startsWith(month)
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  };
   

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Budgets
        </h1>

        <p className="mt-1 text-muted-foreground">
          Plan and control your monthly spending.
        </p>
      </div>
      <AddBudgetDialog />
      <div className="grid gap-6 md:grid-cols-2">
        {budgets.map((budget) => {
          const spent = getSpent(
                budget.category,
                budget.month
                );

          const percentage =
            budget.limit > 0
              ? Math.round(
                  (spent / budget.limit) * 100
                )
              : 0;

          const progress = Math.min(
            percentage,
            100
          );

          const exceeded = spent > budget.limit;

          return (
            <Card
              key={budget.id}
              className="rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {budget.category}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {budget.month}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      deleteBudget(budget.id)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      ₹{spent.toLocaleString("en-IN")}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      of ₹
                      {budget.limit.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      exceeded
                        ? "text-red-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {percentage}%
                  </p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      exceeded
                        ? "bg-red-500"
                        : "bg-primary"
                    }`}
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                {exceeded && (
                  <p className="mt-3 text-sm font-medium text-red-600">
                    ⚠️ Budget exceeded by ₹
                    {(
                      spent - budget.limit
                    ).toLocaleString("en-IN")}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">
            No budgets yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a monthly budget to control your
            spending.
          </p>
        </div>
      )}
    </div>
  );
}