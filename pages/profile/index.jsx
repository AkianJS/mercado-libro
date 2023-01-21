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
    console.log(res);
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
          <div className="mt-4 grid grid-cols-2 gap-4 max-[580px]:grid-cols-1">
            <Button
              handleClick={() => setIsUpdating(true)}
              className="max-w-xs"
            >
              Cambiar contraseña
            </Button>
            <Button
              handleClick={() => setIsRemoving(true)}
              background="rgb(185 28 28)"
              className="max-w-xs"
            >
              Eliminar cuenta
            </Button>
          </div>
          {/* Modal al cambiar contraseña */}
          <Modal show={isUpdating}>
            <div className="bg-white p-8 rounded-md relative">
              <p className="text-center">Digite su nueva contraseña</p>
              <div className="w-full mt-4">
                <label className="text-sm font-bold">Nueva contraseña</label>
                <input
                  ref={newPassword}
                  className="bg-gray-400 w-full rounded-md p-2 outline-none"
                  type="text"
                />
              </div>
              <div
                onClick={() => setIsUpdating(false)}
                className="absolute right-2 top-2 text-2xl hover:scale-105 cursor-pointer"
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
            <div className="bg-white p-8 rounded-md relative">
              <p className="text-center">Está seguro de eliminar su cuenta?</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button handleClick={handleRemoveAccount}>Sí</Button>
                <Button handleClick={() => setIsRemoving(false)}>
                  No, me arrepentí
                </Button>
              </div>
              <div
                onClick={() => setIsRemoving(false)}
                className="absolute right-2 top-2 text-2xl hover:scale-105 cursor-pointer"
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
