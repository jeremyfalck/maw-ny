import { useAppSelector } from "../../app/hooks";
import { selectAuthUser } from "../common/auth/authSlice";
import { Avatar } from "@mui/material";

export function ExpensesList() {
  const user = useAppSelector(selectAuthUser);

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
    </div>
  );
}
