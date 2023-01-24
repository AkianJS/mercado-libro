import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/layout/Layout";
import SalesGrid from "../../../components/SalesGrid";
import Loader from "../../../components/ui/Loader";
import { getSalesBySearch } from "../../../utils/getSalesBySearch";

export default function SalesDEtails({ data, error = false }) {
  const router = useRouter()
  if (error)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <section className="max-w-7xl mx-auto mt-4">
        <h1 className="mx-4 text-xl font-bold">Ventas del {router.query.date}</h1>
        {data?.getVentas?.orden?.map((item) => (
          <SalesGrid key={item.id} orders={item} />
        ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const limit = 10;
  const offset = query.offset || 0;
  const res = await getSalesBySearch({
    from: query.date,
    to: query.date,
    limit: limit,
    offset: offset,
  });
  const { data, errors } = res;
  const error = true;
  console.log(res);

  if (errors || !data)
    return {
      props: {
        error,
      },
    };
  else {
    return {
      props: {
        data,
      },
    };
  }
}
