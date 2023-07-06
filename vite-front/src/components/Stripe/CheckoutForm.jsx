import {
	PaymentElement,
	LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { userInfo } = useSelector((state) => state.auth);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		handleSubmitMail();

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
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

		const templateParams = {
			to_email: userInfo.email,
			message: content,
			to_name: 'Pierre',
		};

		emailjs
			.send(
				'service_yt1fbg8',
				'template_lh4fqne',
				templateParams,
				'mig4vOijtEYmzZkvj'
			)
			.then(
				function (response) {
					console.log('SUCCESS!', response.status, response.text);
				},
				function (error) {
					console.log('FAILED...', error);
				}
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
