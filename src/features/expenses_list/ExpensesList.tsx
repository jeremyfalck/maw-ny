import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addExpense, selectUserExpenses } from "./expensesSlice";
import { Expense } from "./model/FirestoreUser";

export default function ExpensesList() {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectUserExpenses);

  const [name, setName] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [annualAmount, setAnnualAmount] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <p>Ajouter une nouvelle dépense</p>
      <div className="flex">
        <TextField
          placeholder="nom"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          placeholder="coût mensuel"
          onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
        />
        <TextField
          placeholder="coût annuel"
          onChange={(e) => setAnnualAmount(parseInt(e.target.value))}
        />
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              addExpense({
                name,
                monthlyAmount,
                annualAmount,
              })
            );
          }}
        >
          Ajouter
        </Button>
      </div>
      {expenses?.map((expense: Expense) => (
        <ExpenseItem expense={expense} />
      ))}
    </div>
  );
}

interface ExpenseItemProps {
  expense: Expense;
}

function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div className="flex">
      <TextField placeholder="nom">{expense.name}</TextField>
      <TextField placeholder="coût mensuel">{expense.monthlyAmount}</TextField>
      <TextField placeholder="coût annuel">{expense.annualAmount}</TextField>
    </div>
  );
}
