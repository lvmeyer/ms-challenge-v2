import React, { useEffect, useState } from 'react';
import './CartListing.css';
import imgproduct from '../../../../../public/assets/images/nvidia.jpeg';
import { Link } from 'react-router-dom';

export const CartListing = () => {
	const [baskedId, setBaskedId] = useState(0);
	const [userProducts, setUserProducts] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [itemIds, setItemIds] = useState([]);
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
				setBaskedId(data.basketId);

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
						const productIds = data.data.products.map((product) => product.id);
						setItemIds(productIds);
						const quantitiesTest = data.data.products.map((product) => product.quantity);
						setQuantity(quantitiesTest);
					});
			});
	}, []);

	const handleRemoveProductBasket = (productId) => {
		fetch(import.meta.env.VITE_GW_HOSTNAME + `/api/v1/basket/remove`, {
			mode: 'cors',
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
			body: JSON.stringify({
				basketId: baskedId,
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				window.location.reload();
			});
	};

	return (
		<div className="cart-products-container">
			{userProducts.length > 0 ? (
				userProducts.map((userProduct) => (
					<div className="cart-product-card" key={userProduct.id}>
						<div>
							<img
								className="cart-img"
								alt={imgproduct}
								src={userProduct.image}
							/>
						</div>
						<div className="product-description">
							<h3>{userProduct.name}</h3>
							<div className="product-description-items">
								<div>
									<p>
										<strong>Category :</strong> {userProduct.category.name}
									</p>
									<p>
										<strong>Price :</strong> ${userProduct.price}
									</p>
								</div>
								<button
									className="btn btn-danger text-light"
									onClick={() => handleRemoveProductBasket(userProduct.id)}
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<div id="cart-empty" className="alert alert-info">
					Your cart is empty
				</div>
			)}
			<div className="total-amount">
				<strong>Total to pay : </strong>${totalAmount}
			</div>

			{userProducts.length > 0 ? (
				<Link to={`/payment/${baskedId}`}>
					<button className="pay-button">Pay</button>
				</Link>
			) : null}
		</div>
	);
};
