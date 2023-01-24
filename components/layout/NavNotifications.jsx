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
      <li className="text-3xl relative">
        <MdNotifications onClick={() => setShow(!show)} />
        {notifications?.length > 0 && (
          <div className="flex justify-center items-center w-4 h-4 rounded-full bg-emerald-600 absolute right-0 top-3 opacity-90 pointer-events-none">
            <p className="text-white text-sm">{notifications?.length}</p>
          </div>
        )}
      </li>
      <div
        className={`absolute top-10 left-[50%] -translate-x-[50%] w-60 duration-200 overflow-hidden ${show? "" : "h-0"}`}
      >
        <div
          className={`duration-150 bg-white ${
            show ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {notifications?.map((item) => (
            <div className="flex" key={item.id}>
              <p className="p-2 text-sm" key={item.id}>
                {item?.mensaje}
              </p>
              <button onClick={() => handleRemoveNotification(item.id)} className="text-right text-sm mr-2 p-2">
                <FaTrash className="cursor-pointer text-lg hover:scale-105 duration-100" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavNotifications;
