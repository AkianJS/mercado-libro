import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";

const AdminFindISBN = () => {
  const isbnSearchRef = useRef();
  const router = useRouter();

  const handleOnSubmit = (e) => {
    e.preventDefault()
    let value = isbnSearchRef.current.value
    console.log(value)
    router.push(`/admin-panel?query=${value}`);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="max-w-2xl m-auto grid grid-cols-2 gap-2">
        <div>
          <label className="uppercase text-sm">ISBN a modificar</label>
          <input
            ref={isbnSearchRef}
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
            type="text"
          />
        </div>
        <div className="mt-auto">
          <Button text="Buscar" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default AdminFindISBN;
