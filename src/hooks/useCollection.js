// imports
import { useEffect, useRef, useState } from "react";

// firebase imports
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function useCollection(col, _q) {
  const [documents, setDocuments] = useState(null);

  // query setup
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, col);

    // query
    if (query) {
      ref = query(ref, where(...q), orderBy("createdAt", "desc"));
    }

    // realtime data collection
    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    // unsubscribe from listening on unmount
    return () => unsub();
  }, [col, q]);

  return { documents };
}
