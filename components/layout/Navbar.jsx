import styles from "../../styles/Navbar.module.css";
import AppContext from "../../context/AppContext";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useEffect, useState, useRef, useContext } from "react";

const Navbar = () => {
  const {state, setIslogged} = useContext(AppContext);
  console.log(state);

  const [dropdownMenu, setDropdownMenu] = useState(false);
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
    <nav className="w-full bg-white drop-shadow-md sticky top-0 z-10">
      <ul
        className={`flex gap-4 m-auto max-w-screen-xl h-16 items-center ${styles.navItems}`}
      >
        <li
          onClick={handleDropdownMenu}
          className="md:hidden order-first ml-2 text-2xl"
        >
          {!dropdownMenu ? <FaBars /> : <FaWindowClose />}
        </li>
        <div
          ref={dropdownBar}
          className={`absolute bg-white top-16 left-0 w-2/4 z-20 flex flex-col items-center ${
            styles.dropdownMenu
          } ${dropdownMenu ? styles.dropdownMenuIn : styles.dropdownMenuOut}`}
        >
          <NavLinks />
        </div>
        <li className="font-light ml-2 max-md:m-auto text-2xl tracking-widest">
          <Link href="/">
            <span className="font-bold">Mercado</span>
            <i>libro</i>
          </Link>
        </li>
        <div className="flex gap-4 max-md:hidden">
          <NavLinks />
        </div>
        <li className="ml-auto mr-1 max-md:-order-4 max-md:ml-0 text-2xl">
          <FaSearch />
        </li>
        <div className="flex gap-4 mr-2 text-2xl">
          <li>
            <Link href="/login">
              <FaUser />
            </Link>
          </li>
          <li>
            <FaShoppingCart />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
