import styles from "../styles/FormSpan.module.css";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import Google from "./Google";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center h-screen w-full flex-col gap-8 pt-[30vh]">
        <div className="w-3/4 flex justify-center relative items-center">
          <input
            required="required"
            {...register("user")}
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none ${styles.placeholder}`}
            type="text"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none`}
          >
            Ingrese su usuario
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
        </div>
        <Google/>
      </div>
    </form>
  );
};

export default Login;
