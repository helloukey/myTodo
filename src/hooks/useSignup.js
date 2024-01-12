// imports
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuthContext } from "./useAuthContext";

// firebase imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const isMounted = useRef(false);

  const signup = useCallback(
    (email, password, displayName) => {
      setError(null);
      setLoading(true);

      // create new user with email & password
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          updateProfile(res.user, {
            displayName,
          }).then(() => {
            if (isMounted.current) {
              setLoading(false);
              dispatch({ type: "LOGIN", payload: res.user });
            }
          });
        })
        .catch((error) => {
          if (isMounted.current) {
            setLoading(false);
            setError(error.message);
          }
        });
    },
    [dispatch]
  );

  // cleanup function
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return { error, loading, signup };
}
