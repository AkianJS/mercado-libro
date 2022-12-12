import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setCoupon } from "../utils/setCoupon";
import Button from "./ui/Button";

const AdminAddCoupon = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(null);

  const onSubmit = async ({ couponCode, discount }) => {
    const res = await setCoupon({
      couponCode: couponCode,
      discount: parseFloat(discount),
    });
    const { errors, data } = res;
    if (errors || !data) return setMessage("No se pudo agregar el cupón");
    else if (data.insertCupon?.success)
      return setMessage("Cupon agregado correctamente");
  };
  return (
    <div className="max-w-2xl m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Contenedor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="uppercase text-sm">Código del cupón</label>
            <input
              placeholder="Ej: A234B13"
              required="required"
              {...register("couponCode")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="text"
            />
          </div>
          <div>
            <label className="uppercase text-sm">Porcentaje de descuento</label>
            <input
              placeholder="1% .. 99%"
              required="required"
              {...register("discount")}
              className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
              type="number"
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

export default AdminAddCoupon;
