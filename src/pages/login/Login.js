// imports
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import showIcon from "../../assets/eye.svg";
import hideIcon from "../../assets/eye-off.svg";

// styles
import "./Login.css";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  const [showCredential, setShowCredential] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // login user with email & password
    login(email, password);
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="login-container"
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            data-testid="email"
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            data-testid="password"
          />
        </label>

        {/* error message */}
        <div className={`error ${error ? "" : "hidden"}`} data-testid="error">
          {error}
        </div>

        {/* Login button */}
        {!loading && (
          <motion.button
            type="submit"
            variants={buttonVariant}
            whileHover="animate"
          >
            Login
          </motion.button>
        )}

        {/* Logging button */}
        {loading && (
          <motion.button
            type="submit"
            disabled={true}
            variants={buttonVariant}
            animate="animate"
          >
            Logging...
          </motion.button>
        )}

        {/* Demo Credentials */}
        <div className="demo-container">
          <p className="demo-name">Demo Credentials:</p>
          <img
            className={showCredential ? `show-icon` : `show-icon hidden`}
            src={showIcon}
            alt=""
            onClick={() => setShowCredential(false)}
          />
          <img
            className={!showCredential ? `hide-icon` : `hide-icon hidden`}
            src={hideIcon}
            alt=""
            onClick={() => setShowCredential(true)}
          />
        </div>

        {showCredential && (
          <motion.div
            className="credentials-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="email-credential">Email: kunal@google.com</p>
            <p className="password-credential">Password: test@123</p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default Login;
