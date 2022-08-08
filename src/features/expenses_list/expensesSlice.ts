import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getDoc, DocumentReference, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FirestoreExpense, FirestoreUser } from "./model/FirestoreUser";

export interface Expense {
  name: string;
  monthlyAmount: number;
  annualAmount: number;
}

export interface ExpensesState {
  expenses: Expense[];
  status: "idle" | "loading" | "failed";
  firestoreUser: FirestoreUser | null;
  monthlyRevenue: number;
  userId: string;
}

const initialState: ExpensesState = {
  expenses: [],
  status: "idle",
  firestoreUser: null,
  monthlyRevenue: 0,
  userId: "",
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    pushExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense !== action.payload
      );
    },
    setUser: (state, action: PayloadAction<FirestoreUser>) => {
      state.firestoreUser = action.payload;
    },
    setUserExpenses: (state, action: PayloadAction<FirestoreUser>) => {
      state.expenses = action.payload.expenses;
      state.monthlyRevenue = action.payload.monthlyRevenue;
      state.userId = action.payload.id;
    },
  },
});

export const getUserExpensesRef = createAsyncThunk(
  "getUserExpensesRef",
  async (_arg, { getState, dispatch }) => {
    const state: RootState = getState() as RootState;
    const resourceName = state.auth.user?.resourceName?.split("/")[1];
    if (resourceName) {
      const document = doc(firestore, "users", resourceName);
      getDoc(document)
        .then((docSnap) => {
          if (!docSnap.exists()) {
            try {
              setDoc(document, {
                id: resourceName,
                monthlyRevenue: 0,
                expenses: [],
              })
                .then((res) => {
                  console.log("created first user object !");
                })
                .catch((e) => console.log(e));
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          } else {
            dispatch(setUserExpenses(docSnap.data() as FirestoreUser));
          }
        })
        .catch((e) => console.log(e));
    }
  }
);

export const addExpense = createAsyncThunk(
  "addExpense",
  async (expense: Expense, { getState, dispatch }) => {
    const resourceName = (
      getState() as RootState
    ).auth.user?.resourceName?.split("/")[1];
    if (resourceName) {
      const document = doc(firestore, "users", resourceName);
      try {
        setDoc(document, {
          id: resourceName,
          monthlyRevenue: 0,
          expenses: [...(getState() as RootState).expenses.expenses, expense],
        })
          .then((res) => {
            console.log("added expense !");
            dispatch(getUserExpensesRef());
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.error("Error adding expense: ", e);
      }
    }
  }
);

export const { pushExpense, removeExpense, setUserExpenses } =
  expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectUserExpenses = (state: RootState) => state.expenses.expenses;

export default expensesSlice.reducer;
