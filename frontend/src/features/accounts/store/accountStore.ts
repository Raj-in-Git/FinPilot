import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Account, AccountType } from "../types/account";

interface AddAccountData {
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
}

interface AccountStore {
  accounts: Account[];

  addAccount: (data: AddAccountData) => void;
  updateAccount: (id: string, data: Partial<AddAccountData>) => void;
  deleteAccount: (id: string) => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      accounts: [],

      addAccount: (data) => {
        const account: Account = {
          id: crypto.randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          accounts: [...state.accounts, account],
        }));
      },

      updateAccount: (id, data) => {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === id
              ? { ...account, ...data }
              : account
          ),
        }));
      },

      deleteAccount: (id) => {
        set((state) => ({
          accounts: state.accounts.filter(
            (account) => account.id !== id
          ),
        }));
      },
    }),
    {
      name: "finpilot-accounts",
    }
  )
);