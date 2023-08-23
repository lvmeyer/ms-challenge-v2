import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState();

  const { basketId } = useParams();

  useEffect(() => {

    fetch(import.meta.env.VITE_GW_HOSTNAME+`/api/v1/basket/${basketId}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
    .then(response => response.json())
    .then(data => {

      if (data.data === undefined || data.data.price === 0) {
        window.location.href = "/cart";
      }

      // Create PaymentIntent as soon as the page loads
      fetch(import.meta.env.VITE_GW_HOSTNAME+"/api/v1/payment/pay", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
        },
        body: JSON.stringify({price: data.data.price})
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.data.clientSecret));
    });
  }, []);


  return (
    <>
    <div className="container vh-100">
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
    </>
  );
}

export default Payment;
