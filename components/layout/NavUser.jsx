import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

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
    window.localStorage.removeItem('userToken')
    router.push("/login");
  };

  return (
    <>
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
        className={`absolute right-0 top-16 w-52 h-28 overflow-hidden ${
          dropdownUser ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`text-[1.2rem] flex flex-col items-center justify-center h-full transition-all bg-white ${
            dropdownUser ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Link href='/profile'>
            <li className="border-b-2 border-b-black">Perfil</li>
          </Link>
          <li onClick={handleCloseSesion} className="border-b-2 border-b-black">
            Cerrar sesión
          </li>
        </div>
      </div>
    </>
  );
};

export default NavUser;
