import styles from "../../styles/Navbar.module.css";
import AppContext from "../../context/AppContext";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaWindowClose,
} from "react-icons/fa";
import Link from "next/link";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import { useEffect, useState, useRef, useContext } from "react";
import NavUser from "./NavUser";
import NavNotifications from "./NavNotifications";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const { state, setState, updateUserInfo } = useContext(AppContext);
  const { login } = state;

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownBar = useRef();

  const handleClickOutside = (e) => {
    if (!dropdownBar.current.contains(e.target)) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    if (dropdownMenu) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownMenu]);

  const handleDropdownMenu = () => {
    setDropdownMenu(true);
  };

  return (
    <nav className="w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200 dark:border-slate-700/50 sticky top-0 z-[200] px-2 transition-colors duration-300">
      <ul
        className={`flex gap-4 m-auto max-w-screen-xl h-16 items-center ${styles.navItems}`}
      >
        <li
          onClick={handleDropdownMenu}
          className="md:hidden order-first ml-2 text-xl cursor-pointer text-slate-700 dark:text-slate-200"
        >
          {!dropdownMenu ? <FaBars /> : <FaWindowClose />}
        </li>
        <div
          ref={dropdownBar}
          className={`absolute bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 top-16 left-0 w-2/4 flex flex-col gap-2 items-center z-50 ${
            styles.dropdownMenu
          } ${dropdownMenu ? styles.dropdownMenuIn : styles.dropdownMenuOut}`}
        >
          <NavLinks login={login} />
        </div>
        <li className="font-light ml-2 max-md:m-auto text-2xl tracking-widest">
          <Link href="/">
            <span className="font-bold min-[420px]:hidden text-indigo-600 dark:text-indigo-400">ML</span>
            <span className="font-bold max-[420px]:hidden text-indigo-600 dark:text-indigo-400">Mercado</span>
            <i className="max-[420px]:hidden text-slate-500 dark:text-slate-400">libro</i>
          </Link>
        </li>
        <div className="flex gap-4 max-md:hidden">
          <NavLinks login={login} />
        </div>

        {/* Icono de busqueda junto con su funcionalidad*/}
        <li
          onClick={() => setIsSearching(!isSearching)}
          className="ml-auto max-md:-order-4 max-md:ml-0 text-xl cursor-pointer text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <FaSearch />
        </li>
        <NavSearch isSearching={isSearching} />

        {/* Icono de notificacion con su funcionalidad */}
        {!login.usuario?.admin && (
          <NavNotifications
            notifications={login.usuario?.notificacion}
            updateUserInfo={updateUserInfo}
          />
        )}

        <ThemeToggle />

        {/* Icono de usuario y carrito con sus funcionalidades*/}
        <div className="flex gap-5 mr-4 items-center">
          <div>
            <NavUser login={login} setState={setState} />
          </div>
          {!login.usuario?.admin && (
            <li className="relative">
              <Link href="/cart">
                <FaShoppingCart className="text-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                {login?.usuario?.carrito?.items?.length > 0 && (
                  <div className="flex justify-center items-center w-4 h-4 rounded-full bg-indigo-500 absolute -right-1 top-3 opacity-90 pointer-events-none">
                    <p className="text-white text-xs font-medium">
                      {login.usuario?.carrito?.items?.length}
                    </p>
                  </div>
                )}
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
