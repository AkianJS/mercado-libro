import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setTheme } from "../utils/setTheme";
import Button from "./ui/Button";

const AdminAddTheme = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(null);

  const onSubmit = async ({ theme, imageUrl }) => {
    const res = await setTheme({
      theme: theme,
      imageUrl: imageUrl,
    });
    const { errors, data } = res;
    console.log(res)
    if (errors || !data) return setMessage("No se pudo cargar la categoría");
    else if (data.insertTema?.success)
      return setMessage("Categoría cargada correctamente!");
  };
  return (
    <div className="max-w-2xl m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Contenedor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="uppercase text-sm">Nombre de la categoría</label>
            <input
              placeholder="Misterio"
              required="required"
              {...register("theme")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="text"
            />
          </div>
          <div>
            <label className="uppercase text-sm">Url de la imagen</label>
            <input
              placeholder="https://cdn.pixabay.com/photo/2012/12/27/19/41/halloween-72939_960_720.jpg"
              required="required"
              {...register("imageUrl")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="text"
            />
          </div>
        </div>
        <br />
        <Button type="submit" text="Agregar" />
        <br />
      </form>
      {message && <p className="text-center">{message}</p>}
    </div>
  );
};

export default AdminAddTheme;
