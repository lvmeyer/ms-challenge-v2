import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("http://localhost:3000/api/v1/payment/pay", {
  //     mode: 'cors',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.data.clientSecret));
  // }, []);


  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
