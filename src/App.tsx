import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { ExpensesList } from "./features/expenses_list/ExpensesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExpensesList />
      </header>
    </div>
  );
}

export default App;
