import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import styles from "../styles/FormSpan.module.css";
import Google from "./Google";
import jwt_decode from "jwt-decode";
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
    const decoded = jwt_decode(credentialResponse.credential);
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
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none ${styles.placeholder}`}
            type="text"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none font-bold`}
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
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none ${styles.placeholder}`}
            type="email"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none font-bold`}
          >
            Email
          </span>
        </div>
        {errors.email && (
          <p className="text-red-700">{errors.email?.message}</p>
        )}

        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("password")}
            className={`border-2 bg-slate-200 border-black rounded-sm w-full p-2 outline-none ${styles.placeholder}`}
            type="password"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none font-bold`}
          >
            Contraseña
          </span>
        </div>
        {message && <p className="text-sm">{message}</p>}

        <div className="w-3/4">
          <Button type="submit">Registrarse</Button>
        </div>
        <Google handleGoogleSuccess={handleGoogleSuccess} />
      </div>
    </form>
  );
};

export default RegisterForm;
