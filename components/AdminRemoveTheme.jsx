import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { removeTheme } from "../utils/removeTheme";
import Button from "./ui/Button";

const AdminRemoveTheme = ({ themes }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(null);

  const onSubmit = async ({ theme }) => {
    const res = await removeTheme({
      theme: theme,
    });
    const { errors, data } = res;
    console.log(res);
    if (errors || !data) return setMessage("No se pudo borrar la categoría");
    else if (data.eliminarTema?.success)
      return setMessage("Categoría borrada correctamente!")
    else return setMessage("Error, el tema no existe")
  };
  return (
    <div className="max-w-2xl m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Contenedor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="uppercase text-sm">Categoría a eliminar</label>
            <select
              placeholder="Misterio"
              required="required"
              {...register("theme")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="text"
            >
              {themes?.temas?.map((item) => (
                <option key={item.id} value={item.nombre}>{item.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <Button type="submit" text="Borrar" />
        <br />
      </form>
      {message && <p className="text-center">{message}</p>}
    </div>
  );
};

export default AdminRemoveTheme;
