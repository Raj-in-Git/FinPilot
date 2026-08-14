import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAccountStore } from "@/features/accounts/store/accountStore";
import { useTransactionStore } from "@/features/transactions/store/transactionStore";

import type { TransactionType } from "@/features/transactions/types/transaction";

const expenseCategories = [
  "Food",
  "Rent",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

const incomeCategories = [
  "Salary",
  "Business",
  "Investment",
  "Gift",
  "Other",
];

export default function AddTransactionDialog() {
  const accounts = useAccountStore(
    (state) => state.accounts
  );

  const updateBalance = useAccountStore(
    (state) => state.updateBalance
  );

  const addTransaction = useTransactionStore(
    (state) => state.addTransaction
  );

  const [open, setOpen] = useState(false);

  const [type, setType] =
    useState<TransactionType>("expense");

  const [accountId, setAccountId] = useState("");

  const [category, setCategory] = useState("Food");

  const [description, setDescription] = useState("");

  const [amount, setAmount] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [notes, setNotes] = useState("");

  const categories =
    type === "expense"
      ? expenseCategories
      : incomeCategories;

  const handleTypeChange = (
    newType: TransactionType
  ) => {
    setType(newType);

    setCategory(
      newType === "expense"
        ? "Food"
        : "Salary"
    );
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (
      !accountId ||
      !description.trim() ||
      !numericAmount ||
      numericAmount <= 0
    ) {
      return;
    }

    /*
     * Income → positive balance change
     * Expense → negative balance change
     */
    const balanceChange =
      type === "income"
        ? numericAmount
        : -numericAmount;

    updateBalance(
      accountId,
      balanceChange
    );

    addTransaction({
      accountId,
      type,
      category,
      description: description.trim(),
      amount: numericAmount,
      date,
      notes: notes.trim() || undefined,
    });

    setAccountId("");
    setType("expense");
    setCategory("Food");
    setDescription("");
    setAmount("");
    setDate(
      new Date().toISOString().split("T")[0]
    );
    setNotes("");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Transaction
          </DialogTitle>

          <DialogDescription>
            Record your income or expense.
          </DialogDescription>
        </DialogHeader>

        {accounts.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-center">
            <p className="font-medium">
              No accounts available
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Create an account before adding a
              transaction.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Type */}

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={
                  type === "expense"
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  handleTypeChange("expense")
                }
              >
                Expense
              </Button>

              <Button
                type="button"
                variant={
                  type === "income"
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  handleTypeChange("income")
                }
              >
                Income
              </Button>
            </div>

            {/* Account */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Account
              </label>

              <select
                value={accountId}
                onChange={(event) =>
                  setAccountId(event.target.value)
                }
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">
                  Select account
                </option>

                {accounts.map((account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.name} — ₹
                    {account.balance.toLocaleString(
                      "en-IN"
                    )}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <Input
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="e.g. Swiggy"
                required
              />
            </div>

            {/* Amount */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Amount
              </label>

              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                placeholder="450"
                required
              />
            </div>

            {/* Date */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Date
              </label>

              <Input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                required
              />
            </div>

            {/* Notes */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Notes
              </label>

              <Input
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Optional"
              />
            </div>

            {/* Actions */}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                Save Transaction
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}