import React from "react";
import { useFieldArray } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";

const BookDetailsCategory = ({
  book,
  login,
  isEditing,
  register,
  control,
  getTemas,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name: "themes" });

  const category = book.tema?.map((item) => item.nombre);
  return (
    <div className="mt-4 flex gap-2">
      {login.usuario?.admin && isEditing ? (
        <div className=" mb-4 grid grid-cols-3 gap-4 justify-center items-center">
          {fields.map((field, index) => (
            <div className="flex flex-col" key={field.id}>
              <label className="uppercase text-sm">tema {index + 1}</label>
              <div className="flex gap-4">
                <select
                  name="themes"
                  required="required"
                  {...register(`themes.${index}.nombre`)}
                  className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
                  type="text"
                >
                  {getTemas.temas.map((item) => (
                    <option key={item.id} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                {index >= 1 ? (
                  <FaMinus
                    onClick={() => remove(index)}
                    className="text-2xl cursor-pointer hover:scale-110 ease-in"
                  />
                ) : undefined}
              </div>
            </div>
          ))}
          <div
            onClick={() => append()}
            className="flex gap-2 cursor-pointer hover:scale-110 ease-in duration-150"
          >
            <span className="ml-auto text-gray-600">Agregar tema</span>
            <FaPlus className="text-2xl" />
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Categoría: {category.join(", ")}</p>
      )}
    </div>
  );
};

export default BookDetailsCategory;
