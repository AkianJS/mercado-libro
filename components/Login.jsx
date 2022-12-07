import styles from "../styles/FormSpan.module.css";
import { set, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Button from "./ui/Button";
import Google from "./Google";
import AppContext from "../context/AppContext";
import jwt_decode from "jwt-decode";
import { getUserState } from "../utils/getUserState";

const Login = () => {
  const { setState, state } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (loginData) => {
    let email = loginData.email;
    let password = loginData.password;
    getUserState({ email: email, password: password })
      .then((data) => {
        data.errors
          ? setState({ login: false, errors: data.errors })
          : setState(data.data);
        if (data.data?.login?.success)
          window.localStorage.setItem(
            "userToken",
            JSON.stringify(data.data.login.accessToken)
          );
      })
      .catch((errors) => console.error(`error: ${errors}`));
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    let email = decoded.email;
    let password = decoded.sub;
    getUserState({email: email, password: password}).then(data => {
      if (data.errors || !data) return
      setState(data.data)
      if (data?.data?.login?.success) window.localStorage.setItem(
        "userToken",
        JSON.stringify(data.data.login.accessToken))
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center h-screen w-full flex-col gap-8 pt-[30vh]">
        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("email")}
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none ${styles.placeholder}`}
            type="text"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none font-bold`}
          >
            Email
          </span>
        </div>

        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("password")}
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none ${styles.placeholder}`}
            type="password"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none font-bold`}
          >
            Contraseña
          </span>
          {state?.errors?.message && <p>{state.errors.message}</p>}
        </div>
        <div className="w-3/4">
          <Button text="Ingresar" type="submit" />
        </div>
        <Google handleGoogleSuccess={handleGoogleSuccess} />
      </div>
    </form>
  );
};

export default Login;
