import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { removeNotification } from "../../utils/removeNotification";

const NavNotifications = ({ notifications, updateUserInfo }) => {
  const [show, setShow] = useState(false);

  const handleRemoveNotification = async(id) => {
    await removeNotification({id: id})
    await updateUserInfo()
  }

  return (
    <div className="relative">
      <li className="text-2xl relative cursor-pointer">
        <MdNotifications onClick={() => setShow(!show)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
        {notifications?.length > 0 && (
          <div className="flex justify-center items-center w-4 h-4 rounded-full bg-indigo-500 absolute right-0 top-3 opacity-90 pointer-events-none">
            <p className="text-white text-xs font-medium">{notifications?.length}</p>
          </div>
        )}
      </li>
      <div
        className={`absolute top-10 left-[50%] -translate-x-[50%] w-64 duration-200 overflow-hidden ${show? "" : "h-0"}`}
      >
        <div
          className={`duration-150 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 ${
            show ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {notifications?.map((item) => (
            <div className="flex items-center border-b border-slate-100 dark:border-slate-700 last:border-0" key={item.id}>
              <p className="p-3 text-sm text-slate-700 dark:text-slate-300" key={item.id}>
                {item?.mensaje}
              </p>
              <button onClick={() => handleRemoveNotification(item.id)} className="text-right text-sm mr-2 p-2">
                <FaTrash className="cursor-pointer text-base text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 duration-100" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavNotifications;
