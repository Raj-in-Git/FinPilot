import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useTransactionStore } from "@/features/transactions/store/transactionStore";

import AddTransactionDialog from "@/features/transactions/components/AddTransactionDialog";

export default function TransactionsPage() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="mt-1 text-muted-foreground">
            Track your income and expenses.
          </p>
        </div>

        <AddTransactionDialog />
      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Transactions
            </p>

            <p className="mt-2 text-3xl font-bold">
              {transactions.length}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Income
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              +₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Expenses
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              -₹{totalExpenses.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}

      <Card className="rounded-2xl">
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-lg font-semibold">
                No transactions yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Add your first transaction to start tracking
                your finances.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.description}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {transaction.category} ·{" "}
                      {transaction.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={
                        transaction.type === "income"
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {transaction.type === "income"
                        ? "+"
                        : "-"}
                      ₹
                      {transaction.amount.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        deleteTransaction(
                          transaction.id
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}