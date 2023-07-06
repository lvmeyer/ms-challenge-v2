import React from 'react';
import './DeliveryAddress.css';

export const DeliveryAddress = () => {
	return (
		<div className="delivery-address-container">
			<p>Delivering To</p>

			<div className="delivery-address-description">
				<span className="name">Name:</span>
				<span className="address">Address:</span>
				<span className="contact">Contact: </span>
				<button className="place-order-btn">Place Order</button>
			</div>
		</div>
	);
};
