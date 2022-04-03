// imports
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // check if children is wrapped inside
  if (!context) {
    throw new Error("AuthContext must be wrapped inside AuthContextProvider");
  }

  return context;
};
