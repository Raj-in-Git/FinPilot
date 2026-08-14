import { useState } from "react";

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
import type {
  Account,
  AccountType,
} from "@/features/accounts/types/account";

interface EditAccountDialogProps {
  account: Account;
}

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

export default function EditAccountDialog({
  account,
}: EditAccountDialogProps) {
  const updateAccount = useAccountStore(
    (state) => state.updateAccount
  );

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(account.name);
  const [type, setType] = useState<AccountType>(account.type);
  const [balance, setBalance] = useState(
    String(account.balance)
  );
  const [currency, setCurrency] = useState(account.currency);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const numericBalance = Number(balance);

    if (!name.trim() || Number.isNaN(numericBalance)) {
      return;
    }

    updateAccount(account.id, {
      name: name.trim(),
      type,
      balance: numericBalance,
      currency,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>

          <DialogDescription>
            Update your account information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Account Name
            </label>

            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
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
              {accountTypes.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Balance
            </label>

            <Input
              type="number"
              step="0.01"
              value={balance}
              onChange={(event) =>
                setBalance(event.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Currency
            </label>

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value)
              }
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="INR">
                INR - Indian Rupee
              </option>
              <option value="USD">
                USD - US Dollar
              </option>
              <option value="EUR">
                EUR - Euro
              </option>
              <option value="GBP">
                GBP - British Pound
              </option>
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}