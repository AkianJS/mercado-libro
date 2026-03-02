import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <FiSun className="text-xl text-amber-400" />
      ) : (
        <FiMoon className="text-xl text-slate-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
