import React, { useContext, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { setBook } from "../../utils/setBook";
import Button from "../../components/ui/Button";
import AppContext from "../../context/AppContext";
import { getThemes } from "../../utils/getThemes";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import axios from "axios";
import ProtectedRoute from "../../components/ProtectedRoute";

const AdminAddBook = ({ getTemas }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: getTemas.temas[0].nombre,
      entryDate: "",
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "themes" });
  const [message, setMessage] = useState(null);

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
      image: data.imageUrl,
      isbn: data.isbn,
      language: data.language,
      price: parseFloat(data.price),
      stock: parseFloat(data.stock),
      themes: JSON.stringify(themes),
      title: data.title,
    };
    console.log(values);
    setBook(values).then((data) => console.log(data));
  };

  //  Código relacionado a la carga de la imagen

  const [newImage, setNewImage] = useState(null);
  const newImageRef = useRef();

  const handleOnChange = async () => {
    let image = newImageRef.current?.files[0];
    const preview = document.querySelector(".nextImage");
    const reader = new FileReader();
    if (image) reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      preview.src = reader.result;
      setNewImage(reader.result);
    });
    const API_KEY = "b16eeaeb4b528b33243caf08fcd0a989";
    const formData = new FormData();

    // formData.append("image", image);
    // const res = await axios({
    //   timeout: 6000,
    //   method: "POST",
    //   url: `https://api.imgbb.com/1/upload?key=${API_KEY}&name=${book.isbn}`,
    //   data: formData,
    // });
    // const { data, errors } = res;
    // setValue("imageUrl", data.data?.display_url);
  };

  return (
    <Layout>
      <ProtectedRoute isLoading={login.isLoading} myBoolean={login.usuario?.admin} path="/">
        <div className="max-w-2xl m-auto pt-4 pb-4 pr-2 pl-2">
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
                <label className="uppercase text-sm">descuento</label>
                <input
                  placeholder="15"
                  {...register("discount")}
                  className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
                  type="number"
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
                <label className="uppercase text-sm">fecha de edición</label>
                <input
                  placeholder="dd/mm/aaaa"
                  required="required"
                  {...register("editionDate")}
                  className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
                  type="text"
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
            <h4 className="mt-4 mb-4 font-bold text-xl">Imagen: </h4>
            <div
              className={`mb-4 inline-block relative duration-200 hover:scale-105 shadow-md`}
            >
              <label
                htmlFor="image"
                className="bg-contain bg-center w-full h-full absolute cursor-pointer z-20 opacity-50"
              >
                <input
                  {...register("imageUrl")}
                  ref={newImageRef}
                  onChange={handleOnChange}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </label>
              <Image
                className={`nextImage`}
                width={200}
                height={0}
                alt="Image Preview"
                src={newImage || "/Add.png"}
              />
            </div>
            <Button type="submit">Agregar</Button>
          </form>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getThemes();
  const {
    data: { getTemas },
  } = res;

  return {
    props: {
      getTemas,
    },
    revalidate: 10,
  };
}

export default AdminAddBook;
