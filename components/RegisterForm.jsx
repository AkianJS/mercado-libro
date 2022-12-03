import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import styles from "../styles/FormSpan.module.css";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center h-screen w-full flex-col gap-8 pt-[30vh]">
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
            type="text"
          />
          <span
            className={`absolute left-0 pl-2 pr-2 opacity-60 duration-300 pointer-events-none font-bold`}
          >
            Email
          </span>
        </div>
        {errors.email && <p className="text-red-700">{errors.email?.message}</p>}

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
        <div className="w-3/4">
          <Button text="Registrar" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
