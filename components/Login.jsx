import styles from "../styles/FormSpan.module.css";
import { set, useForm } from "react-hook-form";
import { getUserState } from "../utils/getUserState";
import { useContext, useEffect, useMemo } from "react";
import Button from "./ui/Button";
import Google from "./Google";
import AppContext from "../context/AppContext";
import jwt_decode from "jwt-decode";
import { useLazyQuery, gql } from "@apollo/client";
import { getUserApollo } from "../utils/getUserState";

const Login = () => {
  const query = gql(getUserApollo());
  const { setState } = useContext(AppContext);
  const [apolloQuery, { loading, error, data }] = useLazyQuery(query);
  console.log(error);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (loginData) => {
    console.log(loginData);
    let email = loginData.email;
    let password = loginData.password;
    apolloQuery({ variables: { email: email, password: password } }).then((d) =>
      d.error ? alert("No se pudo loguear") : setState(d.data)
    );
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    let email = decoded.email;
    let password = decoded.sub;
    apolloQuery({ variables: { email: email, password: password } });
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
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
          >
            Ingrese su email
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
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
          >
            Ingrese su password
          </span>
        </div>
        <div className="w-3/4">
          <Button text="Ingresar" type="submit" />
          {loading && <p>Estoy cargan2...</p>}
          {error && <p>Error {error.message}</p>}
        </div>
        <Google handleGoogleSuccess={handleGoogleSuccess} />
      </div>
    </form>
  );
};

export default Login;
