import './ProductImage.css';
import Tilt from 'react-parallax-tilt';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import React from 'react';

export const ProductImage = () => {
	const { productId } = useParams();
	const { userInfo } = useSelector((state) => state.auth);
	const [selectedProductImage, setSelectedProductImage] = useState(null);

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
				setSelectedProductImage(data.data.image);
			});
	}, []);

	return (
		<Tilt
			tiltEnable={false}
			scale={1.05}
			transitionSpeed={1000}
			className="product-details-image"
		>
			{' '}
			<img src={selectedProductImage} alt="" />
		</Tilt>
	);
};
