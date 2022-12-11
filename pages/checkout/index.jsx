import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import styles from "../../styles/FormSpan.module.css";
import Button from "../../components/ui/Button";
import AppContext from "../../context/AppContext";
import { setAddress } from "../../utils/setAddress";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";

const Checkout = () => {
  const {
    state: { login },
    updateUserInfo,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  useEffect(() => {
    const defaultValues = {
      name: login?.usuario?.nombre,
      additionalInfo: login?.usuario?.direccion?.infoAdicional,
      address: login?.usuario?.direccion?.direccion,
      cp: login?.usuario?.direccion?.ciudad?.cp,
      dni: login?.usuario?.direccion?.dni,
      phone: login?.usuario?.direccion?.telefono,
    };
    reset(defaultValues);
  }, [reset, login?.isLoading]);

  const onSubmit = async ({
    additionalInfo,
    address,
    cp,
    dni,
    name,
    phone,
  }) => {
    const res = await setAddress({
      token: login.accessToken,
      additionalInfo: additionalInfo,
      address: address,
      cp: parseInt(cp),
      dni: parseInt(dni),
      name: name,
      phone: phone,
    });
    const { errors, data } = res;
    console.log(data);
    await updateUserInfo();
    if (errors || !data) return alert("Servicio caído");
    if (data?.agregarDireccion?.success) router.push("/checkout/payment");
  };

  return (
    <Layout>
      <ProtectedRoute isLoading={login.isLoading} myBoolean={login.success} path='/cart' >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center h-screen m-auto w-full max-w-xl flex-col gap-6 pt-20">
            <h4 className="font-bold text-lg">
              Agregue o modifique sus datos de envío:
            </h4>
            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("name")}
                className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
                type="text"
              />
              <span
                className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
              >
                Nombre
              </span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("address")}
                className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
                type="text"
              />
              <span
                className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
              >
                Dirección
              </span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                name="cp"
                required="required"
                {...register("cp")}
                className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
                type="number"
              />
              <span
                className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
              >
                Código Postal
              </span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("dni")}
                className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
                type="number"
              />
              <span
                className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
              >
                DNI
              </span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("phone")}
                className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
                type="text"
              />
              <span
                className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
              >
                Teléfono
              </span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                {...register("additionalInfo")}
                className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
                type="text"
              />
              <span
                className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
              >
                Información Adicional
              </span>
            </div>

            <div className="w-3/4">
              <Button type="submit" text="Continuar" />
            </div>
          </div>
        </form>
      </ProtectedRoute>
    </Layout>
  );
};

export default Checkout;
