import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Navbar must be used within ThemeProvider");
  }

  const { setTheme } = themeContext;

  return (
    <nav className="navbar">
      <div>
        <h2>Todo Manager</h2>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Todos
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
            About
          </NavLink>
        </div>
      </div>

      <div className="theme-buttons">
        <button type="button" onClick={() => setTheme("light")}>
          Light
        </button>
        <button type="button" onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button type="button" onClick={() => setTheme("ocean")}>
          Ocean
        </button>
      </div>
    </nav>
  );
}
