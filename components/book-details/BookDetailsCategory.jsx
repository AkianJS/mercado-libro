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
              <label className="uppercase text-sm text-slate-800 dark:text-slate-100 transition-colors">tema {index + 1}</label>
              <div className="flex gap-4">
                <select
                  name="themes"
                  required="required"
                  {...register(`themes.${index}.nombre`)}
                  className={`bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg w-full p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors`}
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
                    className="text-2xl cursor-pointer hover:scale-110 ease-in text-slate-800 dark:text-slate-100 transition-colors"
                  />
                ) : undefined}
              </div>
            </div>
          ))}
          <div
            onClick={() => append()}
            className="flex gap-2 cursor-pointer hover:scale-110 ease-in duration-150"
          >
            <span className="ml-auto text-slate-500 dark:text-slate-400 transition-colors">Agregar tema</span>
            <FaPlus className="text-2xl text-slate-800 dark:text-slate-100 transition-colors" />
          </div>
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 transition-colors">Categoría: {category.join(", ")}</p>
      )}
    </div>
  );
};

export default BookDetailsCategory;
