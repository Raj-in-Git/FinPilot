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

import { useBudgetStore } from "@/features/budgets/store/budgetStore";

const categories = [
  "Food",
  "Rent",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

export default function AddBudgetDialog() {
  const addBudget = useBudgetStore(
    (state) => state.addBudget
  );

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const [month, setMonth] = useState(currentMonth);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const numericLimit = Number(limit);

    if (!numericLimit || numericLimit <= 0) {
      return;
    }

    addBudget({
      category,
      limit: numericLimit,
      month,
    });

    setCategory("Food");
    setLimit("");
    setMonth(currentMonth);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Budget</DialogTitle>

          <DialogDescription>
            Set a spending limit for a category.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Limit */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Monthly Limit
            </label>

            <Input
              type="number"
              min="1"
              step="0.01"
              value={limit}
              onChange={(event) =>
                setLimit(event.target.value)
              }
              placeholder="6000"
              required
            />
          </div>

          {/* Month */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Month
            </label>

            <Input
              type="month"
              value={month}
              onChange={(event) =>
                setMonth(event.target.value)
              }
              required
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
              Create Budget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}