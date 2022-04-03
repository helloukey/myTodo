// imports
import { useAuthContext } from "./useAuthContext";

// firebase imports
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function useLogout() {
  const { dispatch } = useAuthContext();

  // signout/logout user
  const logout = () => {
    signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}
