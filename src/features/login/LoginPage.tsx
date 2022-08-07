import { Button } from "@mui/material";
import "react-phone-input-2/lib/material.css";
import {
  authWithGoogle,
  selectConnectionState,
} from "../common/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isConnected = useAppSelector(selectConnectionState);

  useEffect(() => {
    isConnected && navigate("/expenses");
  }, [isConnected]);

  return (
    <div className="flex flex-col items-center pt-4">
      <Button onClick={() => dispatch(authWithGoogle())} variant="contained">
        Sign in with google
      </Button>
    </div>
  );
};

export default LoginPage;
