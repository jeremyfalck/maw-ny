import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getDoc, DocumentReference, doc, setDoc } from "firebase/firestore";
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
  firestoreUser: FirestoreUser | null;
}

const initialState: ExpensesState = {
  expenses: [],
  status: "idle",
  firestoreUser: null,
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
    setUserExpenses: (state, action: PayloadAction<FirestoreUser>) => {
      state.firestoreUser = action.payload;
    },
  },
});

export const getUserExpensesRef = createAsyncThunk(
  "getUserExpensesRef",
  async (_arg, { getState, dispatch }) => {
    const state: RootState | null = getState() as RootState | null;
    const resourceName = state?.auth?.user?.resourceName?.split("/")[1];
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
            dispatch(getUserExpenses(docSnap.data().expenses));
          }
        })
        .catch((e) => console.log(e));
    }
  }
);

export const getUserExpenses = createAsyncThunk(
  "getUserExpenses",
  async (expenses: DocumentReference[], { dispatch }) => {
    expenses.forEach((epxenseRef) => {
      getDoc(epxenseRef)
        .then((doc) => {
          const data = doc.data();
          data && dispatch(pushExpense(data as Expense));
        })
        .catch((e) => console.log(e));
    });
  }
);

export const addExpense = createAsyncThunk(
  "addExpense",
  async (expense: Expense, { getState, dispatch }) => {
    //TODO add expense to firestore
    //TODO add expense reference to user expenses
  }
);

export const { pushExpense, removeExpense, setUserExpenses } =
  expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectUserExpenses = (state: RootState) =>
  state.expenses.firestoreUser?.expenses;

export default expensesSlice.reducer;
