import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import { setTheme } from "../utils/setTheme";
import { updateTheme } from "../utils/updateTheme";
const API_KEY = "b16eeaeb4b528b33243caf08fcd0a989";

const CategoryAddCard = ({
  bookImage,
  isEditing = false,
  setIsEditing,
  originalTheme,
}) => {

  const [isAdding, setIsAdding] = useState(isEditing);
  const [newImage, setNewImage] = useState(null);
  const newImageRef = useRef(null);
  const titleRef = useRef(null);
  const router = useRouter()

  const handleOnChange = async () => {
    let image = newImageRef.current?.files[0];
    const preview = document.querySelector(".nextImageCategoryCard");
    const reader = new FileReader();
    if (image) reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      preview.src = reader.result;
      setNewImage(reader.result);
    });
  };

  const handleSubmit = async () => {
    let image = newImageRef.current?.files[0];
    const formData = new FormData();
    formData.append("image", image);

    if (!image && !bookImage)
      return Swal.fire({
        title: "Error",
        text: "La imagen no puede estar vacía",
        icon: "error",
      });

    if (!titleRef.current.value && !originalTheme)
      return Swal.fire({
        title: "Error",
        text: "El título no puede estar vacío",
        icon: "error",
      });


    const res = image ? await axios({
      timeout: 6000,
      method: "POST",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      data: formData,
    }) : {data: null}

    const { data, errors } = res;
    const res2 = originalTheme
      ? await updateTheme({
          originalTheme: originalTheme,
          theme: titleRef?.current?.value || originalTheme,
          imageUrl: data?.data?.display_url || bookImage,
        })
      : await setTheme({
          theme: titleRef?.current?.value,
          imageUrl: data?.data?.display_url,
        });
    if (res2.errors || !res2.data) {
      Swal.fire({
        title: "Error",
        text: "Se ha producido un error al cargar la categoría",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Éxito!",
        text: "Se ha cargado la nueva categoría correctamente",
        icon: "success",
      });
      router.reload()
    }
  };
  return (
    <div
      className={`h-56 bg-slate-700 dark:bg-slate-800 relative rounded-xl shadow-lg flex items-center justify-center overflow-hidden duration-200 ${
        !isAdding && "hover:scale-105"
      } cursor-pointer`}
    >
      <Image
        onClick={() => setIsAdding(true)}
        className="absolute nextImageCategoryCard"
        fill
        sizes="16rem"
        alt={isAdding ? "" : "Card Add Category"}
        src={isAdding ? newImage || bookImage : "/Add.png"}
      />

      {isAdding && (
        <div className="w-full h-full absolute top-0 left-0 z-20 flex flex-col items-center justify-center gap-2 bg-black/40">
          <button
            onClick={() => {
              setIsEditing && setIsEditing(false);
              setIsAdding(isEditing);
            }}
            className="absolute top-2 right-2 text-2xl text-white hover:text-red-400 z-20 transition-colors"
          >
            <FaWindowClose />
          </button>
          <input
            ref={titleRef}
            name="title"
            className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 p-2 rounded-lg placeholder-slate-400 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors"
            type="text"
            placeholder="Titulo"
          />
          <label
            className="py-1.5 px-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer duration-100 hover:scale-105 text-slate-800 dark:text-slate-100 text-sm font-medium"
            htmlFor="imageAddCategory"
          >
            Subir Imagen
          </label>
          <input
            accept="image/png, image/jpg, image/jpeg"
            ref={newImageRef}
            onChange={handleOnChange}
            className="hidden"
            type="file"
            id="imageAddCategory"
          />
          <button
            onClick={handleSubmit}
            className="absolute bottom-3 py-1.5 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors"
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryAddCard;
