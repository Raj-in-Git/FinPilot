import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Budget } from "../types/budget";

interface AddBudgetData {
  category: string;
  limit: number;
  month: string;
}

interface BudgetStore {
  budgets: Budget[];

  addBudget: (data: AddBudgetData) => void;
  deleteBudget: (id: string) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      budgets: [],

      addBudget: (data) => {
        const budget: Budget = {
          id: crypto.randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          budgets: [...state.budgets, budget],
        }));
      },

      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter(
            (budget) => budget.id !== id
          ),
        }));
      },
    }),
    {
      name: "finpilot-budgets",
    }
  )
);