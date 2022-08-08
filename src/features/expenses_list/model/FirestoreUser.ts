export interface FirestoreUser {
  id: string;
  monthlyRevenue: number;
  expenses: FirestoreExpense[];
}

export interface FirestoreExpense {
  name: string;
  monthlyAmount: number;
  annualAmount: number;
}
