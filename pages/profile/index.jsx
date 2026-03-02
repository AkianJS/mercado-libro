import React, { useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useContext } from "react";
import UserInfo from "../../components/UserInfo";
import Button from "../../components/ui/Button";
import { updateUser } from "../../utils/updateUser";
import Swal from "sweetalert2";
import Modal from "../../components/ui/Modal";
import { FaWindowClose } from "react-icons/fa";
import { removeAccount } from "../../utils/removeAcount";
import { useRouter } from "next/router";

const Profile = () => {
  const {
    state: { login },
    setState,
  } = useContext(AppContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const newPassword = useRef(null);

  const router = useRouter();

  const handleUpdatePassword = async () => {
    setIsUpdating(false);
    let pass = newPassword.current.value;
    const res = await updateUser({ token: login.accessToken, pass: pass });
    if (res.errors || !res.data)
      Swal.fire({
        title: "Error",
        text: "No se pudo cambiar la contraseña, intente más tarde",
        icon: "error",
      });
    else if (res.data.updateUsuario.success)
      Swal.fire({
        title: "Éxito",
        text: "Se cambió la contraseña correctamente",
        icon: "success",
      });
    else
      Swal.fire({
        title: "Error",
        text: "No se pudo cambiar la contraseña, intente más tarde",
        icon: "warning",
      });
  };

  const handleRemoveAccount = async () => {
    setIsRemoving(false);
    const res = await removeAccount({ token: login.accessToken });
    if (res.errors || !res.data)
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la cuenta, intente más tarde",
        icon: "error",
      });
    else if (res.data.eliminarUsuario.success) {
      Swal.fire({
        title: "Éxito",
        text: "Cuenta eliminada",
        icon: "success",
      });
      setState({ login: { success: false } });
      window.localStorage.removeItem("userToken");
      router.push("/login");
    } else
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la cuenta, intente más tarde",
        icon: "warning",
      });
  };

  return (
    <Layout title="MercadoLibro Perfil">
      <ProtectedRoute
        isLoading={login.isLoading}
        myBoolean={login.success}
        path="/login"
      >
        <section className="p-8">
          <UserInfo />
          {!login.usuario?.admin && (
            <div className="mt-6 grid grid-cols-2 gap-4 place-items-center max-[580px]:grid-cols-1">
              <Button
                handleClick={() => setIsUpdating(true)}
                className="max-w-xs"
              >
                Cambiar contraseña
              </Button>
              <Button
                handleClick={() => setIsRemoving(true)}
                background="rgb(239 68 68)"
                className="max-w-xs"
              >
                Eliminar cuenta
              </Button>
            </div>
          )}
          {/* Modal al cambiar contraseña */}
          <Modal show={isUpdating}>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl relative border border-slate-200 dark:border-slate-700">
              <p className="text-center text-slate-800 dark:text-slate-100 font-medium">Digite su nueva contraseña</p>
              <div className="w-full mt-4">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nueva contraseña</label>
                <input
                  ref={newPassword}
                  className="bg-slate-100 dark:bg-slate-700 w-full rounded-lg p-3 outline-none border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors mt-1"
                  type="text"
                />
              </div>
              <div
                onClick={() => setIsUpdating(false)}
                className="absolute right-3 top-3 text-xl hover:scale-105 cursor-pointer text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                <FaWindowClose />
              </div>
              <Button handleClick={handleUpdatePassword} className="mt-4">
                Cambiar
              </Button>
            </div>
          </Modal>

          {/* Modal al eliminar cuenta */}

          <Modal show={isRemoving}>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl relative border border-slate-200 dark:border-slate-700">
              <p className="text-center text-slate-800 dark:text-slate-100 font-medium">Está seguro de eliminar su cuenta?</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button handleClick={handleRemoveAccount}>Sí</Button>
                <Button handleClick={() => setIsRemoving(false)}>
                  No, me arrepentí
                </Button>
              </div>
              <div
                onClick={() => setIsRemoving(false)}
                className="absolute right-3 top-3 text-xl hover:scale-105 cursor-pointer text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                <FaWindowClose />
              </div>
            </div>
          </Modal>
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default Profile;
