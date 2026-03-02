import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import { getSalesBySearch } from "../utils/getSalesBySearch";
import SalesTable from "./SalesTable";

export default function SalesSearch() {
  const datesRef = useRef();
  const [searchedSales, setSearchedSales] = useState([]);
  const [error, setError] = useState(null);

  const handleSalesSearch = async (e) => {
    e.preventDefault();
    const from = formatDate(datesRef.current[0].value);
    const to = formatDate(datesRef.current[1].value);

    const { data, errors } = await getSalesBySearch({
      from: from,
      to: to,
      limit: 10,
      offset: 0,
    });

    if (data?.getVentas?.success) {
      setSearchedSales(data.getVentas);
    } else {
      setError("Error al buscar las ventas, servidor caído");
    }
  };

  const handleNextPage = async () => {
    const from = formatDate(datesRef.current[0].value);
    const to = formatDate(datesRef.current[1].value);

    const { data, errors } = await getSalesBySearch({
      from: from,
      to: to,
      limit: 10,
      offset: searchedSales.page * 10,
    });

    if (data?.getVentas?.success) {
      setSearchedSales(data.getVentas);
    } else {
      setError("Error al buscar las ventas, servidor caído");
    }
  };

  const handlePrevPage = async () => {
    const from = formatDate(datesRef.current[0].value);
    const to = formatDate(datesRef.current[1].value);

    const { data, errors } = await getSalesBySearch({
      from: from,
      to: to,
      limit: 10,
      offset: searchedSales.page * 10 - 20,
    });

    if (data?.getVentas?.success) {
      setSearchedSales(data.getVentas);
    } else {
      setError("Error al buscar las ventas, servidor caído");
    }
  };

  return (
    <>
      <form onSubmit={handleSalesSearch} ref={datesRef}>
        <div className="flex flex-col items-center my-4">
          <p className="font-semibold text-slate-800 dark:text-slate-100">Buscar ventas entre:</p>
          <div className="my-2 flex items-center">
            <input
              required
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 transition-colors"
              type="date"
            />
            <p className="mx-2 text-slate-500 dark:text-slate-400">Y</p>
            <input
              required
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 transition-colors"
              type="date"
            />
          </div>
          <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
          <div>
            <Button type="submit">
              Buscar
            </Button>
          </div>
          {searchedSales?.length !== 0 && (
            <SalesTable orders={searchedSales.orden} />
          )}
        </div>
      </form>

      {searchedSales?.length !== 0 && (
        <div className="flex justify-center gap-4 text-indigo-500 dark:text-indigo-400">
          {searchedSales.page !== 1 && (
            <button onClick={handlePrevPage} className="hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">««</button>
          )}
          <p className="text-slate-700 dark:text-slate-300">
            {searchedSales?.page} de {searchedSales?.maxPage}
          </p>
          {searchedSales?.page !== searchedSales?.maxPage && !searchedSales?.maxPage == 0 && (
            <button onClick={handleNextPage} className="hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">»»</button>
          )}
        </div>
      )}
    </>
  );
}

export function formatDate(date) {
  let dataToArray = date.split("-");
  return `${dataToArray[2]}/${dataToArray[1]}/${dataToArray[0]}`;
}
