import {
  createAsyncThunk,
  createNextState,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FirestoreUser } from "./model/FirestoreUser";

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

export const getUserExpenses = createAsyncThunk(
  "getUserExpenses",
  async (arg, { getState }) => {
    const state: RootState | null = getState() as RootState | null;
    getDocs(collection(firestore, "users"))
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot.empty) {
          try {
            addDoc(collection(firestore, "users"), {
              id: state?.auth?.user?.resourceName,
              monthlyRevenue: 0,
              expenses: [],
            })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch((e) => console.log(e));
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          console.log(querySnapshot.docs);
        }
      })
      .catch((e) => console.log(e));
  }
);

export const { addExpense, removeExpense } = expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export default expensesSlice.reducer;
