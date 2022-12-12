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
            <FaUser className="text-2xl" />
          </li>
        </Link>
      ) : (
        <li ref={userIconRef} onClick={handleDropDownMenu}>
          <FaUser className="text-2xl" />
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
              className={`scale-0 bg-white rounded-full p-1 border-2 ${
                dropdownUser ? "translate-y-0 scale-100" : "-translate-y-full"
              }`}
            >
              {" "}
              <FaUserCircle className="text-4xl" />{" "}
            </li>
          </Link>
          <div
            onClick={handleCloseSesion}
            className={`mt-2 bg-white rounded-full p-1 border-2 hover:scale-110 duration-300 cursor-pointer ${
              dropdownUser
                ? `${styles.closeSesion} translate-y-0`
                : "-translate-y-full scale-0 delay-200"
            }`}
          >
            {" "}
            <IoMdLogOut className="text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
