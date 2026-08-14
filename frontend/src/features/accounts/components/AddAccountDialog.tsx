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
import type { AccountType } from "@/features/accounts/types/account";

const accountTypes: {
  value: AccountType;
  label: string;
}[] = [
  { value: "bank", label: "Bank Account" },
  { value: "cash", label: "Cash" },
  { value: "credit_card", label: "Credit Card" },
  { value: "wallet", label: "Wallet" },
  { value: "investment", label: "Investment" },
];

interface AddAccountDialogProps {
  trigger?: boolean;
}

export default function AddAccountDialog({
  trigger = true,
}: AddAccountDialogProps) {
  const addAccount = useAccountStore((state) => state.addAccount);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType>("bank");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("INR");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericBalance = Number(balance);

    if (!name.trim() || Number.isNaN(numericBalance)) {
      return;
    }

    addAccount({
      name: name.trim(),
      type,
      balance: numericBalance,
      currency,
    });

    setName("");
    setType("bank");
    setBalance("");
    setCurrency("INR");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>

          <DialogDescription>
            Add a bank account, wallet, cash account or investment account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Account Name
            </label>

            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. HDFC Bank"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Account Type
            </label>

            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value as AccountType)
              }
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              {accountTypes.map((accountType) => (
                <option
                  key={accountType.value}
                  value={accountType.value}
                >
                  {accountType.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Opening Balance
            </label>

            <Input
              type="number"
              min="0"
              step="0.01"
              value={balance}
              onChange={(event) => setBalance(event.target.value)}
              placeholder="45000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Currency
            </label>

            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="INR">INR - Indian Rupee</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Add Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}