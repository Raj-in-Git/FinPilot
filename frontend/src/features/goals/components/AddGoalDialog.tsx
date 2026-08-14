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

import { useGoalStore } from "@/features/goals/store/goalStore";

export default function AddGoalDialog() {
  const addGoal = useGoalStore((state) => state.addGoal);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const target = Number(targetAmount);
    const current = Number(currentAmount);

    if (
      !name.trim() ||
      !target ||
      target <= 0 ||
      current < 0 ||
      !targetDate
    ) {
      return;
    }

    addGoal({
      name: name.trim(),
      targetAmount: target,
      currentAmount: current,
      targetDate,
    });

    setName("");
    setTargetAmount("");
    setCurrentAmount("");
    setTargetDate("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Financial Goal</DialogTitle>

          <DialogDescription>
            Set a target and track your progress.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Goal Name
            </label>

            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. Emergency Fund"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Target Amount
            </label>

            <Input
              type="number"
              min="1"
              step="0.01"
              value={targetAmount}
              onChange={(event) =>
                setTargetAmount(event.target.value)
              }
              placeholder="100000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Current Saved Amount
            </label>

            <Input
              type="number"
              min="0"
              step="0.01"
              value={currentAmount}
              onChange={(event) =>
                setCurrentAmount(event.target.value)
              }
              placeholder="45000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Target Date
            </label>

            <Input
              type="date"
              value={targetDate}
              onChange={(event) =>
                setTargetDate(event.target.value)
              }
              required
            />
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
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}