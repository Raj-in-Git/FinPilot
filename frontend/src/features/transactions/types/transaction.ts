export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
  date: string;
  notes?: string;
  createdAt: string;
}