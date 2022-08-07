export interface FirestoreUser {
  id: string;
  monthlyRevenue: number;
  expenses: Expense[];
}

export interface Expense {
  name: string;
  monthlyAmount: number;
  annualAmount: number;
}
