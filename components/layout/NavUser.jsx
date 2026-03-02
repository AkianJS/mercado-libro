import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import styles from "../../styles/Navbar.module.css";

const NavUser = ({ login, setState }) => {
  const [dropdownUser, setDropdownUser] = useState(false);

  const dropdownUserRef = useRef();
  const userIconRef = useRef();
  const router = useRouter();

  const handleClickOutside = (e) => {
    if (
      !userIconRef.current.contains(e.target) &&
      !dropdownUserRef.current.contains(e.target)
    ) {
      setDropdownUser(false);
    }
  };

  useEffect(() => {
    if (dropdownUser) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownUser]);

  const handleDropDownMenu = () => {
    setDropdownUser(!dropdownUser);
  };

  const handleCloseSesion = () => {
    setState({ login: { success: false } });
    window.localStorage.removeItem("userToken");
    router.push("/login");
  };

  return (
    <div className="relative">
      {!login?.success ? (
        <Link href={login?.success ? "" : "/login"}>
          <li>
            <FaUser className="text-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
          </li>
        </Link>
      ) : (
        <li ref={userIconRef} onClick={handleDropDownMenu} className="cursor-pointer">
          <FaUser className="text-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
        </li>
      )}

      <div
        ref={dropdownUserRef}
        className={`absolute left-[50%] -translate-x-[50%] top-12 w-16 h-28 overflow-hidden ${
          dropdownUser ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`text-[1.2rem] flex flex-col items-center justify-center h-full`}
        >
          <Link href={"/profile"}>
            <li
              className={`scale-0 bg-white dark:bg-slate-800 rounded-full p-1 border-2 border-slate-200 dark:border-slate-600 shadow-md ${
                dropdownUser ? "translate-y-0 scale-100" : "-translate-y-full"
              } transition-all duration-200`}
            >
              {" "}
              <FaUserCircle className="text-4xl text-slate-600 dark:text-slate-300" />{" "}
            </li>
          </Link>
          <div
            onClick={handleCloseSesion}
            className={`mt-2 bg-white dark:bg-slate-800 rounded-full p-1 border-2 border-slate-200 dark:border-slate-600 shadow-md hover:scale-110 duration-300 cursor-pointer ${
              dropdownUser
                ? `translate-y-0`
                : "-translate-y-full scale-0"
            } transition-all`}
          >
            {" "}
            <IoMdLogOut className="text-4xl text-slate-600 dark:text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
