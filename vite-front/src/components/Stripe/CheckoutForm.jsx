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
	const [itemIds, setItemIds] = useState([]);
	const [userProducts, setUserProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [quantity, setQuantity] = useState(0);

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
						const productIds = data.data.products.map((product) => ({
							id: product.id,
							quantity: product.quantity,
						}));
						setItemIds(productIds);
					});
			});
	}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

		if (!stripe || !elements) {
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

		itemIds.forEach(itemId => {
			const uuid = itemId.id;
			const quantity = itemId.quantity-1;

			fetch(import.meta.env.VITE_GW_HOSTNAME+`/api/v1/products/quantity/${uuid}`, {	
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
				},
				body: JSON.stringify({quantity: quantity})
			})
			.then((res) => res.json())
			.then((data) => console.log(data));

		});
		
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${window.location.origin}/completion`,
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occured.');
		}

		setIsLoading(false);
	};

	const handleSubmitMail = () => {
		const content = 'Hello, thank you for your payment !';


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

		emailjs.send(
			'service_yt1fbg8',
			'template_lh4fqne',
			templateParams,
			'mig4vOijtEYmzZkvj'
		);
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<LinkAuthenticationElement id="link-authentication-element" />
			<PaymentElement id="payment-element" />
			<button disabled={isLoading || !stripe || !elements} id="submit">
				<span id="button-text">
					{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
				</span>
			</button>
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
}
