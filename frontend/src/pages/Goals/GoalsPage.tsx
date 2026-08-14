import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useGoalStore } from "@/features/goals/store/goalStore";

import AddGoalDialog from "@/features/goals/components/AddGoalDialog";
import EditGoalDialog from "@/features/goals/components/EditGoalDialog";

export default function GoalsPage() {
  const goals = useGoalStore(
    (state) => state.goals
  );

  const deleteGoal = useGoalStore(
    (state) => state.deleteGoal
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Financial Goals
        </h1>

        <p className="mt-1 text-muted-foreground">
          Track the things you're saving for.
        </p>
      </div>
        <AddGoalDialog />
      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => {
          const percentage =
            goal.targetAmount > 0
              ? Math.round(
                  (goal.currentAmount /
                    goal.targetAmount) *
                    100
                )
              : 0;

          const progress = Math.min(
            percentage,
            100
          );

          return (
            <Card
              key={goal.id}
              className="rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">
                        {goal.name}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                        Target: {goal.targetDate}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <EditGoalDialog goal={goal} />

                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGoal(goal.id)}
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      ₹
                      {goal.currentAmount.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      of ₹
                      {goal.targetAmount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {percentage}%
                  </p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">
            No goals yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first financial goal.
          </p>
        </div>
      )}
    </div>
  );
}