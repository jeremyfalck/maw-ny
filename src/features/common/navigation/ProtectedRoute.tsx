import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthToken } from "../auth/authSlice";

const ProtectedRoute = ({ children }: any) => {
  const token = useAppSelector(selectAuthToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
