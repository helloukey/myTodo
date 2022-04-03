// firebase imports
import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

// styles
import "./List.css";
import { motion, AnimatePresence } from "framer-motion";

// assets
import Delete from "../assets/delete.svg";

// motion variants
const buttonVariant = {
  hover: {
    rotate: [0, 5, -5],
    scale: 1.2,
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
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      duration: 1,
      delay: 0.5,
    },
  },
};

export default function List({ todos }) {
  // handle delete
  const handleDelete = async (id) => {
    const ref = doc(db, "todos", id);
    await deleteDoc(ref);
  };

  // handle complete
  const handleComplete = (e) => {
    e.target.classList.toggle("strike");
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="list-container"
    >
      <AnimatePresence>
        {todos &&
          todos.map((todo) => (
            // list animaton
            <motion.li
              key={todo.id}
              onClick={handleComplete}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              exit={{ x: "-100%", opacity: 0, duration: 0.5 }}
            >
              {/* span animation */}
              <motion.span
                whileHover={{
                  x: 5,
                  color: "rgb(255,255,255)",
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.3,
                  },
                }}
              >
                {todo.title}
              </motion.span>

              {/* delete animaton */}
              <motion.img
                src={Delete}
                alt="delete"
                className="delete"
                variants={buttonVariant}
                whileHover="hover"
                onClick={() => handleDelete(todo.id)}
              />
            </motion.li>
          ))}
      </AnimatePresence>
    </motion.div>
  );
}
