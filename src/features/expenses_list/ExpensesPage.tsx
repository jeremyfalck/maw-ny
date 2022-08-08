import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthUser } from "../common/auth/authSlice";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { getUserExpensesRef } from "./expensesSlice";
import ExpensesList from "./ExpensesList";

export function ExpensesPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (user?.resourceName) {
      dispatch(getUserExpensesRef());
    }
  }, [dispatch, user?.resourceName]);

  return (
    <div className="bg-amber-500 w-full h-full">
      <div className="flex justify-between pt-2 px-2">
        <p>
          Bienvenue {(user?.names[0] && user?.names[0]?.displayName) || ""} !
        </p>
        <Avatar
          alt={(user?.names[0] && user?.names[0]?.displayName) || ""}
          src={user?.photos[0] && user?.photos[0]?.url}
        />
      </div>
      <div className="mt-4">
        <ExpensesList />
      </div>
    </div>
  );
}
