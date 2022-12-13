import React from "react";
import { getSells } from "../utils/getSells";

const AdminVentas = ({ res }) => {
  console.log(res);
  return <div>
    Ventas
  </div>;
};

export async function getStaticProps() {
  const res = await getSells();
  console.log(res)
  return {
    props: {
      res,
    },
  };
}

export default AdminVentas;
