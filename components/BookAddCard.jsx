import Image from "next/image";
import Link from "next/link";
import React from "react";

const Book = () => {
  return (
    <li className="w-[240px] h-[390px] relative flex items-center justify-center rounded-xl cursor-pointer hover:scale-105 hover:z-10 duration-200 border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-colors">
      <Link href="/admin/new-book">
        <Image
          className="opacity-40 dark:opacity-30"
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
