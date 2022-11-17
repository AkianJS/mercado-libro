import React from "react";
import Layout from "../../components/layout/Layout";

const Payment = ({configuration}) => {

  return (
    <Layout>
      <div className="cardPaymentBrick_container">
        {configuration.items[0].title}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const mercadopago = require("mercadopago");

  mercadopago.configure({
    access_token:
      "TEST-102529111039618-111319-be2cad25aff0465082c188157129480d-184613295",
  });

  const preference = {
    items: [
      {
        title: "Test",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 10,
        back_urls: { failure: '/failure'},
      },
    ],
  };

  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    console.log(response) // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  })
  .catch(function (error) {
    console.log(error);
  });
  
  return {
    props: {
      configuration: preference
    }
  }
}

export default Payment;
