import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditAccountDialog from "@/features/accounts/components/EditAccountDialog";

import { useAccountStore } from "@/features/accounts/store/accountStore";

import AddAccountDialog from "@/features/accounts/components/AddAccountDialog";
const deleteAccount = useAccountStore(
  (state) => state.deleteAccount
);

export default function AccountsPage() {
  const accounts = useAccountStore((state) => state.accounts);

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Accounts
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage your bank accounts, cash and wallets.
          </p>
        </div>

        <AddAccountDialog />

      </div>

      {/* Total Balance */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">

          <p className="text-sm text-muted-foreground">
            Total Balance
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            ₹{totalBalance.toLocaleString("en-IN")}
          </h2>

        </CardContent>
      </Card>

      {/* Accounts */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {accounts.map((account) => (
        <Card key={account.id} className="rounded-2xl">
            <CardContent className="p-6">
            <div className="flex items-start justify-between">
                <div>
                <p className="text-sm capitalize text-muted-foreground">
                    {account.type.replace("_", " ")}
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                    {account.name}
                </h3>
                </div>

                <div className="flex gap-2">
                <EditAccountDialog account={account} />

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => deleteAccount(account.id)}
                >
                    Delete
                </Button>
                </div>
            </div>

            <p className="mt-6 text-2xl font-bold">
                {account.currency}{" "}
                {account.balance.toLocaleString("en-IN")}
            </p>
            </CardContent>
        </Card>
        ))}

      </div>

      {/* Empty State */}
      {accounts.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center">

          <h3 className="text-lg font-semibold">
            No accounts yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Add your first account to start tracking your money.
          </p>

        </div>
      )}

    </div>
  );
}