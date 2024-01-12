import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const isMounted = useRef(false);

  const login = useCallback((email, password) => {
    setError(null);
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (isMounted.current) {
          dispatch({ type: "LOGIN", payload: res.user });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          setLoading(false);
          setError(error.message);
        }
      });
  },[dispatch]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { error, loading, login };
};

export default useLogin;