// imports
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";

// styles
import "./Navbar.css";
import { motion } from "framer-motion";

// assets
import Logo from "../assets/logo.svg";
import Logout from "../assets/logout.svg";

// motion variants
const linkVariant = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 4px white",
    transition: { repeat: Infinity, repeatType: "reverse", duration: 0.3 },
  },
};

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="navbar">
      <ul className="logo-container">
        {/* logo animation */}
        <motion.li animate={{ rotate: 360 }} transition={{ duration: 2 }}>
          <Link to="/">
            <img src={Logo} alt="logo" className="logo" />
          </Link>
        </motion.li>

        <li>
          <Link to="/" style={{textDecoration: "none"}}>
            <h1>myTodo</h1>
          </Link>
        </li>
      </ul>
      <ul className="links-container">
        {user && (
          <li>
            <span className="displayName">Hi, {user.displayName}</span>
          </li>
        )}

        {/* login button animation on hover */}
        {!user && (
          <motion.li variants={linkVariant} whileHover="hover">
            <Link to="/myTodo/login">Login</Link>
          </motion.li>
        )}

        {/* signup button animation on hover */}
        {!user && (
          <motion.li variants={linkVariant} whileHover="hover">
            <Link to="/myTodo/signup">Signup</Link>
          </motion.li>
        )}

        {/* logout button animation on hover  */}
        {user && (
          <motion.li variants={linkVariant} whileHover="hover">
            <button onClick={logout} className="logout-button">
              <span className="logout">Logout</span>
              <img src={Logout} alt="logout" className="logout-icon" />
            </button>
          </motion.li>
        )}
      </ul>
    </div>
  );
}
