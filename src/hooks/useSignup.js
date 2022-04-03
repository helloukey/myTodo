// imports
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

// firebase imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [cancelled, setCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);

    // create new user with email & password
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName,
        }).then(() => {
          dispatch({ type: "LOGIN", payload: res.user });
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    // stop loading when cancelled state is false
    if (!cancelled) {
      setLoading(false);
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { error, loading, signup };
}
