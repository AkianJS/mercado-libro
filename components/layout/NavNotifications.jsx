import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import {FaTrash} from "react-icons/fa"

const NavNotifications = ({ notifications }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <li className="text-3xl relative">
        <MdNotifications onClick={() => setShow(!show)} />
        {notifications?.length && (
          <div className="flex justify-center items-center w-4 h-4 rounded-full bg-emerald-600 absolute right-0 top-3 opacity-90 pointer-events-none">
            <p className="text-white text-sm">{notifications?.length}</p>
          </div>
        )}
      </li>
      <div
        className={`absolute top-16 right-0 overflow-hidden ${
          !show && "pointer-events-none"
        }`}
      >
        <div
          className={`relative w-60 duration-200 bg-white ${
            show ? "translate-y-0" : "-translate-y-full pointer-events-none"
          }`}
        >
          {notifications?.map((item) => (
            <div className="flex" key={item.id}>
              <p className="p-2 text-sm" key={item.id}>
                {item?.mensaje}
              </p>
              <p className="text-right text-sm mr-2 p-2">
                <FaTrash className="cursor-pointer text-lg hover:scale-105 duration-100" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavNotifications;
