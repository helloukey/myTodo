import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

const useUpdate = () => {
  const [updatePending, setUpdatePending] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateDocument = async (id, userOption) => {
    setUpdatePending(true);
    setUpdateError(null);
    const docRef = doc(db, "todos", id);
    try {
      await updateDoc(docRef, {
        isComplete: userOption,
      });
      setUpdatePending(false);
      setUpdateError(null);
    } catch (error) {
      setUpdateError(error.message);
      setUpdatePending(false);
    }
  };

  return { updateDocument, updatePending, updateError };
};
export default useUpdate;
