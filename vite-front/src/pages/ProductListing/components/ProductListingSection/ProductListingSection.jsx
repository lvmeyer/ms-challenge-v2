import './ProductListingSection.css';
import Tilt from 'react-parallax-tilt';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

export const ProductListingSection = (props) => {
	
	const { userInfo } = useSelector((state) => state.auth);

	const [products, setProducts] = useState([]);
	const [baskedId, setBaskedId] = useState(0);

	const [priceFilter, setPriceFilter] = useState(null);
	const [sortingFilter, setSortingFilter] = useState(null);
	const [categoryFilter, setCategoryFilter] = useState(null);

	useEffect(() => {
		if (props.filters) {
			setPriceFilter(props.filters.priceFilter);
			setSortingFilter(props.filters.sortingFilter);
			setCategoryFilter(props.filters.categoryFilter);
		}
	}, [props.filters]);

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

				fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/products', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer ' +
							JSON.parse(localStorage.getItem('userInfo')).access_token,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						setProducts(data.data);

						if (priceFilter) {
							const filteredProducts = data.data.filter(
								(product) =>
									(priceFilter.below200 && product.price < 200) ||
									(priceFilter.between201and999 &&
										product.price >= 201 &&
										product.price <= 999) ||
									(priceFilter.between1000and1999 &&
										product.price >= 1000 &&
										product.price <= 1999) ||
									(priceFilter.above2000 && product.price > 2000) ||
									(!priceFilter.below200 &&
										!priceFilter.between201and999 &&
										!priceFilter.between1000and1999 &&
										!priceFilter.above2000)
							);
							setProducts(filteredProducts);

							if (sortingFilter) {
								const sortedProducts = filteredProducts.sort((a, b) => {
									if (sortingFilter.highToLow) {
										return b.price - a.price;
									} else if (sortingFilter.lowToHigh) {
										return a.price - b.price;
									}
								});
								setProducts(sortedProducts);

								if (
									categoryFilter &&
									Object.values(categoryFilter).includes(true)
								) {
									console.log(sortedProducts);
									const filteredProducts = sortedProducts.filter(
										(product) => categoryFilter[product.category.name]
									);
									setProducts(filteredProducts);
								}
							}
						}
					});
			});
	}, [priceFilter, sortingFilter, categoryFilter]);

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
		<div className="product-card-container ">
			{products.length > 0 ? (
				Array.isArray(products) &&
				products.map((product) => {
					const { id, name, price, description, image, category } = product;

					return (
						<Tilt
							key={id}
							tiltMaxAngleX={5}
							tiltMaxAngleY={5}
							glareEnable={false}
							transitionSpeed={2000}
							scale={1.02}
						>
							<div className="product-card">
								<Link to={`/product-details/${id}`}>
									<div className="product-card-image">
										<img src={image} alt="IMAGE D'UN MATERIEL INFORMATIQUE" />
									</div>
								</Link>

								<div className="product-card-details">
									<h3 className='name' >{name}</h3>
									<div className="price-container">
										<p className="category-name">
											<strong>Category :</strong> {category.name}
										</p>
										<p className="discount-price">
											<strong>Price :</strong> <span id="price">${price}</span>
										</p>
									</div>

									<div className="info">
									</div>
								</div>

							{userInfo && (userInfo.role === 'USER') ? (
								<div className="product-card-buttons">
									<button
										className="cart-btn"
										onClick={() => addToCart(product)}
									>
										Add to Cart
									</button>
								</div>
							) : userInfo && (userInfo.role === 'ADMINISTRATEUR') ? (
								<>
								</>
							) : (
								<>
								</>
							)}
							</div>
						</Tilt>
					);
				})
			) : (
				<div className="no-products">
					<h2>No products found</h2>
				</div>
			)}
			<ToastContainer position="bottom-right" />
		</div>
	);
};
