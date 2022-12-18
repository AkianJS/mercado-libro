import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getBooks } from "../utils/getBooks";
import { setBook } from "../utils/setBook";
import AdminFindISBN from "./AdminFindISBN";
import Button from "./ui/Button";

const AdminAddBook = ({ login, getTemas }) => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: [{ nombre: getTemas.temas[0].nombre }],
      entryDate: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "themes" });

  const [message, setMessage] = useState(null);
  const router = useRouter();
  const {query} = router.query;

  useEffect(() => {
    if (query) {
      getBooks({ isbn: query }).then((res) => {
        const { errors, data } = res;
        console.log(res)
        if (errors || !data) setMessage("Error en el servidor");
        else if (data.getLibro?.success) {
          const { getLibro } = data;
          setMessage("ISBN encontrado");
          let author = getLibro?.libro[0]?.autor.map(item => item.nombre)
          const defaultValues = {
            isbn: getLibro.libro[0].isbn,
            author: author.join(', '),
            description: getLibro.libro[0].descripcion,
            title: getLibro.libro[0].titulo,
            price: getLibro.libro[0].precio,
            editionDate: getLibro.libro[0].fecha_edicion,
            stock: getLibro.libro[0].stock,
            entryDate: getLibro.libro[0].fecha_ingreso,
            discount: getLibro.libro[0].descuento,
            language: getLibro.libro[0].idioma.nombre,
            editorial: getLibro.libro[0].editorial.nombre,
            image: getLibro.libro[0].url_imagen,
          };
          console.log(defaultValues)
          reset(defaultValues);
        }
      });
    }
  }, [query, reset]);

  const onSubmit = (data) => {
    const author = JSON.stringify([data.author]);
    const themes = data.themes.map((item) => item.nombre);
    const description = JSON.stringify(data.description);
    const values = {
      author: author,
      description: description,
      discount: parseFloat(data.discount) || null,
      editionDate: data.editionDate,
      editorial: data.editorial,
      entryDate: data.entryDate || null,
      image: data.image,
      isbn: data.isbn,
      language: data.language,
      price: parseFloat(data.price),
      stock: parseFloat(data.stock),
      themes: JSON.stringify(themes),
      title: data.title,
    }
    console.log(values)
    setBook(values).then((data) => console.log(data));
  };

  return (
    <div className="max-w-2xl m-auto">
      <AdminFindISBN />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="uppercase text-sm">autor/es</label>
        <input
          placeholder="George R.R Martin"
          required="required"
          {...register("author")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        />

        <label className="uppercase text-sm">isbn</label>
        <input
          placeholder="345248753"
          required="required"
          {...register("isbn")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        />

        <label className="uppercase text-sm">imagen del libro</label>
        <input
          placeholder="https://m.media-amazon.com/images/I/81YuAlejXCL.jpg"
          required="required"
          {...register("image")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        />

        <label className="uppercase text-sm">titulo</label>
        <input
          placeholder="Harry Potter y La Piedra Filosofal"
          required="required"
          {...register("title")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="">
            <label className="uppercase text-sm">precio</label>
            <input
              placeholder="2300"
              required="required"
              {...register("price")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="number"
            />
          </div>
          <div>
            <label className="uppercase text-sm">fecha de edición</label>
            <input
              placeholder="dd/mm/aaaa"
              required="required"
              {...register("editionDate")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="text"
            />
          </div>

          <div>
            <label className="uppercase text-sm">stock</label>
            <input
              placeholder="7"
              required="required"
              {...register("stock")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="number"
            />
          </div>
        </div>

        <label className="uppercase text-sm">descripción</label>
        <textarea
          rows="10"
          cols="50"
          required="required"
          {...register("description")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="uppercase text-sm">fecha de ingreso</label>
            <input
              placeholder="dd/mm/aaaa"
              {...register("entryDate")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="text"
            />
          </div>
          <div>
            <label className="uppercase text-sm">descuento</label>
            <input
              placeholder="15"
              {...register("discount")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="number"
            />
          </div>
        </div>

        <label className="uppercase text-sm">idioma</label>
        <input
          placeholder="Español"
          required="required"
          {...register("language")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        />

        <label className="uppercase text-sm">editorial</label>
        <input
          placeholder="OnlineCapture"
          required="required"
          {...register("editorial")}
          className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
          type="text"
        />

        <div className=" mb-4 grid grid-cols-3 gap-4">
          {fields.map((field, index) => (
            <div className="flex flex-col" key={field.id}>
              <label className="uppercase text-sm">tema/s</label>
              <div className="flex gap-4">
                <select
                  name="themes"
                  required="required"
                  {...register(`themes.${index}.nombre`)}
                  className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
                  type="text"
                >
                  {getTemas.temas.map((item) => (
                    <option key={item.id} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                {index >= 1 ? (
                  <FaMinus
                    onClick={() => remove(index)}
                    className="text-2xl cursor-pointer hover:scale-110 ease-in"
                  />
                ) : undefined}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-4 mt-4 mb-4 transition-all">
          <FaPlus
            onClick={() => append()}
            className="ml-auto text-2xl cursor-pointer hover:scale-110 ease-in"
          />
        </div>

        <Button type="submit" text="Agregar" />
      </form>
    </div>
  );
};

export default AdminAddBook;
