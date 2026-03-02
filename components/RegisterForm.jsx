import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import styles from "../styles/FormSpan.module.css";
import Google from "./Google";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../utils/setUser";
import { useContext, useState } from "react";
import { getUserState } from "../utils/getUserState";
import AppContext from "../context/AppContext";

const RegisterForm = () => {
  const [message, setMessage] = useState(null);
  const { setState } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let name = data.name;
    let email = data.email;
    let password = data.password;
    setUser({ name: name, email: email, password: password }).then((data) => {
      data.errors
        ? setTimeout(
            () => setMessage("Error al registrar usuario, intente más tarde"),
            3000
          )
        : setMessage(data.data.singUp.message);
    });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    let name = decoded.name;
    let email = decoded.email;
    let password = decoded.sub;
    getUserState({ name: name, email: email, password: password }).then(
      (data) => {
        if (data.errors || !data.data) {
          setMessage("Error al registrar usuario, intente más tarde");
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage(data.data?.login?.message);
          window.localStorage.setItem(
            "userToken",
            JSON.stringify(data.data.login.accessToken)
          );
          setState(data.data);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center h-screen w-full flex-col gap-8 pt-[30vh]">
        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("name")}
            className={`bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-3 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all ${styles.placeholder}`}
            type="text"
          />
          <span
            className={`absolute left-0 pl-3 pr-2 opacity-60 duration-300 pointer-events-none font-medium text-slate-500 dark:text-slate-400`}
          >
            Nombre Completo
          </span>
        </div>

        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("email", {
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
            className={`bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-3 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all ${styles.placeholder}`}
            type="email"
          />
          <span
            className={`absolute left-0 pl-3 pr-2 opacity-60 duration-300 pointer-events-none font-medium text-slate-500 dark:text-slate-400`}
          >
            Email
          </span>
        </div>
        {errors.email && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errors.email?.message}</p>
        )}

        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("password")}
            className={`bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-3 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all ${styles.placeholder}`}
            type="password"
          />
          <span
            className={`absolute left-0 pl-3 pr-2 opacity-60 duration-300 pointer-events-none font-medium text-slate-500 dark:text-slate-400`}
          >
            Contraseña
          </span>
        </div>
        {message && <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>}

        <div className="w-3/4">
          <Button type="submit">Registrarse</Button>
        </div>
        <Google handleGoogleSuccess={handleGoogleSuccess} />
      </div>
    </form>
  );
};

export default RegisterForm;
