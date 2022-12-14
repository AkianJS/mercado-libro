import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";

const BookDetailsImage = ({
  book,
  login,
  isEditing,
  register,
  setValue,
}) => {
  const [newImage, setNewImage] = useState(null);
  const newImageRef = useRef();

  const handleOnChange = async () => {
    let image = newImageRef.current?.files[0];
    const preview = document.querySelector(".nextImage");
    const reader = new FileReader();
    if (image) reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      preview.src = reader.result;
      setNewImage(reader.result);
    });
    const API_KEY = "b16eeaeb4b528b33243caf08fcd0a989";
    const formData = new FormData();

    formData.append("image", image);
    const res = await axios({
      timeout: 6000,
      method: "POST",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}&name=${book.isbn}`,
      data: formData,
    });
    const { data, errors } = res;
    setValue("imageUrl", data.data?.display_url);
  };

  return (
    <div
      className={`mb-4 relative w-[270px] h-[430px] duration-200 ${
        isEditing && "hover:scale-105"
      }`}
    >
      {login.usuario?.admin && isEditing && (
        <label
          htmlFor="image"
          className="bg-[url(https://i.ibb.co/jz1b8XC/add-icon-png-2486.png)] bg-white bg-opacity-80 object-contain bg-center w-full h-full absolute cursor-pointer z-20 opacity-50"
        >
          <input
            {...register("imageUrl")}
            ref={newImageRef}
            onChange={handleOnChange}
            className="hidden"
            type="file"
            id="image"
          />
        </label>
      )}
      <Image
        className={`nextImage`}
        fill
        alt={book.titulo}
        src={newImage || book.url_imagen}
      />
    </div>
  );
};

export default BookDetailsImage;
