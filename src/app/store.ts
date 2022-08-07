import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import expensesReducer from "../features/expenses_list/expensesSlice";
import authReducer from "../features/common/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    expenses: expensesReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
