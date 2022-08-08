import "./App.css";
import { ExpensesPage } from "./features/expenses_list/ExpensesPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/LoginPage";
import HomePage from "./features/welcome/HomePage";
import ProtectedRoute from "./features/common/navigation/ProtectedRoute";
import { useAppDispatch } from "./app/hooks";
import { getUser } from "./features/common/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  dispatch(getUser());
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
