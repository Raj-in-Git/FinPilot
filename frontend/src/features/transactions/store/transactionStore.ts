import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Transaction,
  TransactionType,
} from "../types/transaction";

interface AddTransactionData {
  accountId: string;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
  date: string;
  notes?: string;
}

interface TransactionStore {
  transactions: Transaction[];

  addTransaction: (data: AddTransactionData) => void;
  deleteTransaction: (id: string) => void;
}

export const useTransactionStore =
  create<TransactionStore>()(
    persist(
      (set) => ({
        transactions: [],

        addTransaction: (data) => {
          const transaction: Transaction = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            transactions: [
              transaction,
              ...state.transactions,
            ],
          }));
        },

        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter(
              (transaction) =>
                transaction.id !== id
            ),
          }));
        },
      }),
      {
        name: "finpilot-transactions",
      }
    )
  );