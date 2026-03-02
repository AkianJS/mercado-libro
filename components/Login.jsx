import styles from "../styles/FormSpan.module.css";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Button from "./ui/Button";
import Google from "./Google";
import AppContext from "../context/AppContext";
import { jwtDecode } from "jwt-decode";
import { getUserState } from "../utils/getUserState";
import Link from "next/link";

const Login = () => {
  const { setState, state } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(null);

  const onSubmit = async (loginData) => {
    let email = loginData.email;
    let password = loginData.password;
    try {
      const res = await getUserState({ email: email, password: password });
      const { errors, data } = res;
      if (errors || !data) return setMessage("Error en el servidor");
      setState(data);
      setMessage(data.login?.message);
      if (data?.login?.success)
        window.localStorage.setItem(
          "userToken",
          JSON.stringify(data.login.accessToken)
        );
    } catch (err) {
      setMessage(err);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    let name = decoded.name;
    let email = decoded.email;
    let password = decoded.sub;
    getUserState({ name: name, email: email, password: password }).then(
      (data) => {
        if (data.errors || !data.data) {
          setMessage("Error al ingresar el usuario, intente más tarde");
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
            {...register("email")}
            className={`bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-3 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all ${styles.placeholder}`}
            type="email"
          />
          <span
            className={`absolute left-0 pl-3 pr-2 opacity-60 duration-300 pointer-events-none font-medium text-slate-500 dark:text-slate-400`}
          >
            Email
          </span>
        </div>

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
          <Button type="submit">Ingresar</Button>
        </div>
        <Link href="/pass-recover">
          <p className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            Olvidé mi contraseña
          </p>
        </Link>
        <Google handleGoogleSuccess={handleGoogleSuccess} />
      </div>
    </form>
  );
};

export default Login;
