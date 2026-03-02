import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import styles from "../../styles/FormSpan.module.css";
import Button from "../../components/ui/Button";
import AppContext from "../../context/AppContext";
import { setAddress } from "../../utils/setAddress";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getCities } from "../../utils/getCities";

const Checkout = ({data}) => {
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
    await updateUserInfo();
    if (errors || !data) return alert("Servicio caído");
    if (data?.agregarDireccion?.success) router.push("/checkout/payment");
  };

  const inputClass = `bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-3 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all ${styles.placeholder}`;
  const spanClass = "absolute left-0 pl-3 pr-2 opacity-60 duration-300 pointer-events-none text-slate-500 dark:text-slate-400 font-medium";

  return (
    <Layout>
      <ProtectedRoute isLoading={login.isLoading} myBoolean={login.success} path='/cart' >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center h-screen m-auto w-full max-w-xl flex-col gap-6 pt-20">
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">
              Agregue o modifique sus datos de envío:
            </h4>
            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("name")}
                className={inputClass}
                type="text"
              />
              <span className={spanClass}>Nombre</span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("address")}
                className={inputClass}
                type="text"
              />
              <span className={spanClass}>Dirección</span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <select
                name="cp"
                required="required"
                {...register("cp")}
                className={inputClass}
                type="number"
              >
                {data?.getCiudades?.ciudad?.map(item =>
                  <option key={item.cp} value={item.cp}>{item.nombre}</option>
                  )}
                </select>
              <span className={spanClass}>Ciudad</span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("dni")}
                className={inputClass}
                type="number"
              />
              <span className={spanClass}>DNI</span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                required="required"
                {...register("phone")}
                className={inputClass}
                type="text"
              />
              <span className={spanClass}>Teléfono</span>
            </div>

            <div className="w-3/4 flex justify-center relative items-center">
              <input
                {...register("additionalInfo")}
                className={inputClass}
                type="text"
              />
              <span className={spanClass}>Información Adicional</span>
            </div>

            <div className="w-3/4">
              <Button type="submit">Continuar</Button>
            </div>
          </div>
        </form>
      </ProtectedRoute>
    </Layout>
  );
};

export async function getStaticProps () {
  const res = await getCities()
  const {errors, data} = res

  return {
    props: {
      data
    }
  }
}

export default Checkout;
