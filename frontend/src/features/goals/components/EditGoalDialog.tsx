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

import { useGoalStore } from "@/features/goals/store/goalStore";
import type { Goal } from "@/features/goals/types/goal";

interface EditGoalDialogProps {
  goal: Goal;
}

export default function EditGoalDialog({
  goal,
}: EditGoalDialogProps) {
  const updateGoal = useGoalStore(
    (state) => state.updateGoal
  );

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(
    String(goal.targetAmount)
  );
  const [currentAmount, setCurrentAmount] = useState(
    String(goal.currentAmount)
  );
  const [targetDate, setTargetDate] = useState(
    goal.targetDate
  );

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const target = Number(targetAmount);
    const current = Number(currentAmount);

    if (
      !name.trim() ||
      target <= 0 ||
      current < 0 ||
      !targetDate
    ) {
      return;
    }

    updateGoal(goal.id, {
      name: name.trim(),
      targetAmount: target,
      currentAmount: current,
      targetDate,
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
          <DialogTitle>Edit Financial Goal</DialogTitle>

          <DialogDescription>
            Update your goal and savings progress.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Goal Name
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}