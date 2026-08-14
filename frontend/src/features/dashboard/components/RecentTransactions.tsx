import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionStore } from "@/features/transactions/store/transactionStore";
import { useAccountStore } from "@/features/accounts/store/accountStore";

export default function RecentTransactions() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const accounts = useAccountStore(
    (state) => state.accounts
  );

  const recentTransactions = transactions.slice(0, 5);

  const getAccountName = (accountId: string) => {
    return (
      accounts.find((account) => account.id === accountId)
        ?.name ?? "Unknown Account"
    );
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {recentTransactions.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No transactions yet.
          </div>
        ) : (
          <div className="divide-y">
            {recentTransactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isIncome
                          ? "bg-green-100 text-green-600 dark:bg-green-950"
                          : "bg-red-100 text-red-600 dark:bg-red-950"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium">
                        {transaction.description}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {transaction.category} ·{" "}
                        {getAccountName(transaction.accountId)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        isIncome
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {isIncome ? "+" : "-"}₹
                      {transaction.amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}