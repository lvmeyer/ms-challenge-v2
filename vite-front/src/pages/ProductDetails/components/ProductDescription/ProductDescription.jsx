import './ProductDescription.css';
import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

export const ProductDescription = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { productId } = useParams();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const navigate = useNavigate();
	const [baskedId, setBaskedId] = useState(0);

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
			});
	}, []);

	useEffect(() => {
		fetch(import.meta.env.VITE_GW_HOSTNAME + `/api/v1/products/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setSelectedProduct(data.data);
			});
	}, []);

	const [cartItems, setCartItems] = useState([]);

	const addToCart = (product) => {
		const existingItem = cartItems.find((item) => item.id === product.id);

		if (existingItem) {
			toast.info('Product is already in the cart');
		} else {
			fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/basket/add', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('userInfo')).access_token,
				},
				body: JSON.stringify({
					basketId: baskedId,
					productId: product.id,
				}),
			})
				.then((response) => {
					if (response.ok) {
						setCartItems([...cartItems, product]);
						toast.success('Product added to cart successfully');
					} else {
						throw new Error('Failed to add product to cart');
					}
				})
				.catch((error) => {
					console.error(error);
					toast.error('Failed to add product to cart');
				});
		}
	};

	return (
		<div className="product-details-description">
			{selectedProduct && (
				<>
					<h1 className="product-name">{selectedProduct.name}</h1>

					<div className="ratings-reviews">
						<span></span>
						<span></span> <BsFillStarFill color={'orange'} />
						<span>
							<span className="review">reviews </span>
						</span>
					</div>

					<div className="product-price-container">
						<span className="product-discount-price">
							{selectedProduct.price}$
						</span>
					</div>

					<p className="description-container">
						<span>Description</span>: {selectedProduct.description}
					</p>
					<p className="description-container">
						<span>Stock</span>: X
					</p>

					<span className="gender-container">
						<span>Catégorie</span>: {selectedProduct.category.name}
					</span>

					{selectedProduct.productSubCategory.map((subCategory) => (
						<span className="gender-container">
							<span>{subCategory.subCategory.type}</span> :{' '}
							{subCategory.subCategory.name}
						</span>
					))}

					<div className="tags">
						<span className="out-of-stock"></span>
						<span className="trending"></span>
					</div>
					<div className="product-card-buttons-container">
						<button
							className="add-to-cart-btn"
							onClick={() => addToCart(selectedProduct)}
						>
							Add to cart
						</button>
						<button
							className="add-to-wishlist-btn"
							onClick={() => navigate('/product-listing')}
						>
							Back to products
						</button>
					</div>
				</>
			)}
			<ToastContainer position="bottom-right" />
		</div>
	);
};
