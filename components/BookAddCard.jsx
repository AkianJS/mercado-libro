import Image from "next/image";
import Link from "next/link";
import React from "react";

const Book = () => {
  return (
    <li className="w-[250px] h-[380px] relative flex items-center justify-center shadow-md cursor-pointer hover:scale-110 hover:z-10 duration-100">
      <Link href="/admin/new-book">
        <Image
          className=""
          alt="Add Book"
          src="/Add.png"
          width={200}
          height={0}
        />
      </Link>
    </li>
  );
};

export default Book;
