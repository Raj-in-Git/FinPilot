import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Goal } from "../types/goal";

interface AddGoalData {
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

interface GoalStore {
  goals: Goal[];

  addGoal: (data: AddGoalData) => void;
  updateGoal: (
    id: string,
    data: Partial<AddGoalData>
  ) => void;
  deleteGoal: (id: string) => void;
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],

      addGoal: (data) => {
        const goal: Goal = {
          id: crypto.randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          goals: [...state.goals, goal],
        }));
      },

      updateGoal: (id, data) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, ...data }
              : goal
          ),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter(
            (goal) => goal.id !== id
          ),
        }));
      },
    }),
    {
      name: "finpilot-goals",
    }
  )
);