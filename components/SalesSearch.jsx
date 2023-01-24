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
    const from = () => {
      let dataToArray = datesRef.current[0].value.split("-");
      return `${dataToArray[2]}/${dataToArray[1]}/${dataToArray[0]}`;
    };
    const to = () => {
      let dataToArray = datesRef.current[1].value.split("-");
      return `${dataToArray[2]}/${dataToArray[1]}/${dataToArray[0]}`;
    };

    const { data, errors } = await getSalesBySearch({
      from: from(),
      to: to(),
      limit: 10,
      offset: 0,
    });

    if (data?.getVentas?.success) {
      setSearchedSales(data.getVentas.orden);
    } else {
      setError("Error al buscar las ventas, servidor caído");
    }
  };

  return (
    <form ref={datesRef}>
      <div className="flex flex-col items-center my-4">
        <p className="text font-bold">Buscar ventas entre:</p>
        <div className="my-2 flex items-center">
          <input
            className="px-2 py-1 border border-black"
            type="date"
            pattern="\d{1,2}/\d{1,2}/\d{4}"
          />
          <p className="mx-2">Y</p>
          <input className="px-2 py-1 border border-black" type="date" />
        </div>
        <p>{error}</p>
        <div>
          <Button handleClick={handleSalesSearch} type="submit">
            Buscar
          </Button>
        </div>
        {searchedSales.length !== 0 && <SalesTable orders={searchedSales} />}
      </div>
    </form>
  );
}
