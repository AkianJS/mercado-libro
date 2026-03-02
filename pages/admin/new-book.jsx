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
import Swal from "sweetalert2";

const AdminAddBook = ({ getTemas }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: [getTemas.temas[0].nombre],
      entryDate: "",
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "themes" });

  const onSubmit = async (data) => {
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
    const res = await setBook(values);
    if (res.errors || !res.data)
      return Swal.fire({
        title: "Error",
        text: "Los servidores están caídos, intente más tarde",
        icon: "error",
      });
    else if (res.data.insertLibro.success) {
      reset()
      return Swal.fire({
        title: "Éxito",
        text: "Se ha agregado el libro correctamente",
        icon: "success",
      });
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el libro",
        icon: "error"
      })
    }
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

    formData.append("image", image);
    const res = await axios({
      timeout: 6000,
      method: "POST",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}&name=${book.isbn}`,
      data: formData,
    });
    const { data, errors } = res;
    setValue("imageUrl", data.data?.display_url);
  };

  const inputClass = "bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-2.5 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors";
  const labelClass = "uppercase text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider mt-3 mb-1 block";

  return (
    <Layout>
      <ProtectedRoute
        isLoading={login.isLoading}
        myBoolean={login.usuario?.admin}
        path="/"
      >
        <div className="max-w-2xl m-auto pt-6 pb-6 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className={labelClass}>autor/es</label>
            <input
              placeholder="George R.R Martin"
              required="required"
              {...register("author")}
              className={inputClass}
              type="text"
            />

            <label className={labelClass}>isbn</label>
            <input
              placeholder="345248753"
              required="required"
              {...register("isbn")}
              className={inputClass}
              type="text"
            />

            <label className={labelClass}>titulo</label>
            <input
              placeholder="Harry Potter y La Piedra Filosofal"
              required="required"
              {...register("title")}
              className={inputClass}
              type="text"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>precio</label>
                <input
                  placeholder="2300"
                  required="required"
                  {...register("price")}
                  className={inputClass}
                  type="number"
                />
              </div>

              <div>
                <label className={labelClass}>descuento</label>
                <input
                  placeholder="15"
                  {...register("discount")}
                  className={inputClass}
                  type="number"
                />
              </div>

              <div>
                <label className={labelClass}>stock</label>
                <input
                  placeholder="7"
                  required="required"
                  {...register("stock")}
                  className={inputClass}
                  type="number"
                />
              </div>
            </div>

            <label className={labelClass}>descripción</label>
            <textarea
              rows="10"
              cols="50"
              required="required"
              {...register("description")}
              className={inputClass}
              type="text"
            ></textarea>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>fecha de ingreso</label>
                <input
                  placeholder="dd/mm/aaaa"
                  {...register("entryDate")}
                  className={inputClass}
                  type="text"
                />
              </div>

              <div>
                <label className={labelClass}>fecha de edición</label>
                <input
                  placeholder="dd/mm/aaaa"
                  required="required"
                  {...register("editionDate")}
                  className={inputClass}
                  type="text"
                />
              </div>
            </div>

            <label className={labelClass}>idioma</label>
            <input
              placeholder="Español"
              required="required"
              {...register("language")}
              className={inputClass}
              type="text"
            />

            <label className={labelClass}>editorial</label>
            <input
              placeholder="OnlineCapture"
              required="required"
              {...register("editorial")}
              className={inputClass}
              type="text"
            />

            <div className="mb-4 grid grid-cols-3 gap-4">
              {fields.map((field, index) => (
                <div className="flex flex-col" key={field.id}>
                  <label className={labelClass}>tema/s</label>
                  <div className="flex gap-4 items-center">
                    <select
                      name="themes"
                      required="required"
                      {...register(`themes.${index}.nombre`)}
                      className={inputClass}
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
                        className="text-xl cursor-pointer hover:scale-110 ease-in text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      />
                    ) : undefined}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex gap-4 mt-4 mb-4 transition-all">
              <FaPlus
                onClick={() => append()}
                className="ml-auto text-xl cursor-pointer hover:scale-110 ease-in text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              />
            </div>
            <h4 className="mt-4 mb-4 font-bold text-xl text-slate-800 dark:text-slate-100">Imagen: </h4>
            <div
              className={`mb-4 inline-block relative duration-200 hover:scale-105 rounded-lg overflow-hidden`}
              style={{boxShadow: 'var(--card-shadow)'}}
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
