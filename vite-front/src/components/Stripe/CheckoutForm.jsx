import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import {useEffect, useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser'

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

	const [userProducts, setUserProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/user-basket', {
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {

				fetch(
					import.meta.env.VITE_GW_HOSTNAME +
						`/api/v1/basket/${data.basketId}/products`,
					{
						mode: 'cors',
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization:
								'Bearer ' +
								JSON.parse(localStorage.getItem('userInfo')).access_token,
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setUserProducts(data.data.products);
						setTotalAmount(data.data.price);
					});
			});
	}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    handleSubmitMail();

    fetch(import.meta.env.VITE_GW_HOSTNAME+"/api/v1/payment/removeBasketAfterPayment", {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
    .then((res) => res.json())
    .then((data) => console.log(data));


    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  }

  const handleSubmitMail = () => {

    const content = "Hello, thank you for your payment !";

    const cartItems = () => {
      let str = "";
      userProducts.map((item) => {
        str += `${item.name} x 1 = ${item.price}$ \n`;
      });
      return str;
    };

    const templateParams = {
      to_email: userInfo.email,
      message: content,
      products: cartItems(),
      totalAmount: totalAmount
    };

    emailjs.send("service_yt1fbg8", "template_lh4fqne", templateParams, "mig4vOijtEYmzZkvj")
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
