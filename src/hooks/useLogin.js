// imports
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

// firebase imports
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [cancelled, setCancelled] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    // signin user with email & password
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        console.log(res.user);
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

  return { error, loading, login };
}
