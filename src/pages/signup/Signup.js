// imports
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

// styles
import "./Signup.css";
import { motion } from "framer-motion";

// motion variants
const buttonVariant = {
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
    transition: { duration: 0.5 },
  },
};

const errorVariant = {
  shake: {
    rotate: [0, 2, -2, 0],
    transition: {
      repeat: 5,
      repeatType: "loop",
      duration: 0.3,
    },
  },
};

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // signup new user
    signup(email, password, displayName);
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="signup-container"
    >
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Display Name:</span>
          <input
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            required
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          {/* error animation */}
          {error && (
            <motion.div
              variants={errorVariant}
              animate="shake"
              className="error"
            >
              {error}
            </motion.div>
          )}
        </label>

        {/* button when loading is false */}
        {!loading && (
          <motion.button variants={buttonVariant} whileHover="animate">
            Signup
          </motion.button>
        )}

        {/* button when loading is true */}
        {loading && (
          <motion.button variants={buttonVariant} animate="animate" disabled>
            Loading
          </motion.button>
        )}
      </form>
    </motion.div>
  );
}
