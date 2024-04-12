// imports
import useCollection from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Home.css";
import { motion } from "framer-motion";

// components
import List from "../../components/List";

// firebase imports
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { timestamp } from "../../firebase/config";

// motion variants
const addVariant = {
  animate: {
    scale: 1.1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.3,
    },
  },
};

const containerVariant = {
  hidden: {
    opacity: 0,
    scale: 0.1,
    x: "-50%",
    y: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 1 },
  },
};

export default function Home() {
  const [todo, setTodo] = useState("");
  const { user } = useAuthContext();
  const { documents } = useCollection("todos", ["uid", "==", user.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add document to collection
    const ref = collection(db, "todos");
    await addDoc(ref, {
      title: todo,
      uid: user.uid,
      createdAt: timestamp,
      isComplete: false,
    });

    // reset input field
    setTodo("");
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="todo-container"
    >
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            placeholder="enter todo..."
            required
          />

          <motion.button variants={addVariant} whileHover="animate">
            Add
          </motion.button>
        </label>
      </form>
      {documents && <List todos={documents} />}
    </motion.div>
  );
}
