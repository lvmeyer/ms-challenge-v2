import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Completion(props) {
	const [messageBody, setMessageBody] = useState('');
	const [alert, setAlert] = useState('');
	const { stripePromise } = props;

	useEffect(() => {
		if (!stripePromise) return;

		stripePromise.then(async (stripe) => {
			const url = new URL(window.location);
			const clientSecret = url.searchParams.get('payment_intent_client_secret');
			const { error, paymentIntent } = await stripe.retrievePaymentIntent(
				clientSecret
			);

			if (paymentIntent.status === 'succeeded') {
				setAlert('alert alert-success');
			} else {
				setAlert('alert alert-danger');
			}

			setMessageBody(
				error ? (
					`> ${error.message}`
				) : (
					<> Payment {paymentIntent.status}, an email has been sent to you. </>
				)
			);
		});
	}, [stripePromise]);

	return (
		<>
			<div className="container" style={{ height: '80vh' }}>
				<h1 id="confirm-paiment" className={alert}>
					{messageBody}
				</h1>
				<Link to="/">
					<button className="btn btn-outline-dark">Back to Home</button>
				</Link>
			</div>
		</>
	);
}

export default Completion;
