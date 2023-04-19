// imports
import { createContext, useReducer, useEffect } from "react";

// firebase imports
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// create context
export const AuthContext = createContext();

// auth reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // check auth status on first load
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      return () => unsub();
    });
  }, []);

  // wrap children inside AuthContext
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
