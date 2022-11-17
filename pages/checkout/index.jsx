import React from "react";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import styles from "../../styles/FormSpan.module.css";
import Button from "../../components/ui/Button";
import Link from "next/link";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center h-screen m-auto w-full max-w-xl flex-col gap-6 pt-20">
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
              required="required"
              {...register("state")}
              className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
              type="text"
            />
            <span
              className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
            >
              Provincia
            </span>
          </div>

          <div className="w-3/4 flex justify-center relative items-center">
            <input
              required="required"
              {...register("city")}
              className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
              type="text"
            />
            <span
              className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
            >
              Ciudad
            </span>
          </div>

          <div className="w-3/4 flex justify-center relative items-center">
            <input
              required="required"
              {...register("phone")}
              className={`border-2 border-black rounded-md w-full p-2 outline-none ${styles.placeholder}`}
              type="number"
            />
            <span
              className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
            >
              Teléfono
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
          <div className="w-3/4">
            <Link href='/checkout/payment'>
              <Button type="submit" text="pagar" />
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Checkout;
