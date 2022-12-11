import React, { useState } from "react";
import { MdNotificationAdd, MdNotifications } from "react-icons/md";

const NavNotifications = ({ notifications }) => {
  const mensaje = notifications?.map((item) => item?.mensaje);
  const [show, setShow] = useState(false);
  return (
    <>
      <li className="text-3xl relative">
        <MdNotifications onClick={() => setShow(!show)} />
        {mensaje?.length && (
          <div className="flex justify-center items-center w-4 h-4 rounded-full bg-emerald-600 absolute right-0 top-3 opacity-90 pointer-events-none">
            <p className="text-white text-sm">{mensaje?.length}</p>
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
            show ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {notifications?.map((item) => (
            <div key={item.id}>
              <p className="text-right text-sm cursor-pointer mr-2 font-bold">
                Limpiar
              </p>
              <p className="p-2 text-sm" key={item.id}>
                {mensaje && mensaje}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavNotifications;
