export type AccountType =
  | "bank"
  | "cash"
  | "credit_card"
  | "wallet"
  | "investment";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  createdAt: string;
}