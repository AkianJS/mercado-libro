import Image from "next/image";
import BooksGrid from "../components/BooksGrid";
import Layout from "../components/layout/Layout";
import book from "../public/book-cover.webp";

export default function Home() {

  return (
    <Layout>
      <div className="w-full relative h-90vh bg-black">
        <Image
          className="object-cover h-90vh opacity-90"
          alt="prueba"
          src={book}
        />
        <div className="w-3/4 h-auto sm:whitespace-pre text-[15vw] sm:text-[10vw] absolute text-white text-center uppercase top-10 left-2/4 -translate-x-2/4">
          <h1 className={`leading-tight`}>
            <strong>cyber </strong>
            <i>monday</i>
          </h1>
        </div>
        <h2
          className={`text-white text-center bottom-10 absolute left-2/4 -translate-x-2/4 whitespace-pre text-[18vw] sm:text-[10vw]`}
        >
          <i>
            <strong>50%</strong> OFF
          </i>
        </h2>
      </div>

      <BooksGrid texth3="Ofertas" />
    </Layout>
  );
}
