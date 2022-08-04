import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Expense {
  name: string;
  monthlyAmount: number;
  annualAmount: number;
}

export interface ExpensesState {
  expenses: Expense[];
  status: "idle" | "loading" | "failed";
}

const initialState: ExpensesState = {
  expenses: [],
  status: "idle",
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense !== action.payload
      );
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = "loading";
  //       });
  //   },
});

export const { addExpense, removeExpense } = expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export default expensesSlice.reducer;
