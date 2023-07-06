import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Profile.css';

export const EditProduct = () => {
	const { productId } = useParams();
	const [editProductData, setEditProductData] = useState({
		data: {
			name: '',
			price: 0,
			description: '',
			image: '',
			category: {
				id: '',
			},
		},
	});

	useEffect(() => {
		// Récupérer les données du produit
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
				setEditProductData(data);
			})
			.catch((error) => {
				console.log(error);
			});

		// Récupérer les catégories
		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/categories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		}).then((response) => response.json());
	}, [productId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedValue = name === 'price' ? parseFloat(value) : value;

		if (name === 'category') {
			const selectedCategoryId = value;
			setEditProductData((prevData) => ({
				...prevData,
				data: {
					...prevData.data,
					category: {
						id: selectedCategoryId,
					},
				},
			}));
		} else {
			setEditProductData((prevData) => ({
				...prevData,
				data: {
					...prevData.data,
					[name]: updatedValue,
				},
			}));
		}
	};

	const handleUpdate = (e) => {
		e.preventDefault();

		const updatedFields = {};

		if (editProductData.data.name !== '') {
			updatedFields.name = editProductData.data.name;
		}
		if (editProductData.data.price !== 0) {
			updatedFields.price = parseFloat(editProductData.data.price);
		}
		if (editProductData.data.description !== '') {
			updatedFields.description = editProductData.data.description;
		}
		if (editProductData.data.image !== '') {
			updatedFields.image = editProductData.data.image;
		}
		if (editProductData.data.category.id !== '') {
			updatedFields.category = { id: editProductData.data.category.id };
		}

		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/products/' + productId, {
			mode: 'cors',
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
			body: JSON.stringify(updatedFields),
		}).then((response) => response.json());
	};

	return (
		<div className="container m-5">
			<form onSubmit={handleUpdate} className="d-flex flex-column">
				<input
					className="form-control"
					name="name"
					placeholder="Name"
					value={editProductData.data.name}
					onChange={handleChange}
					id="name"
				/>

				<input
					className="form-control"
					name="price"
					placeholder="Price"
					value={editProductData.data.price}
					onChange={handleChange}
					id="price"
				/>

				<input
					className="form-control col"
					name="description"
					placeholder="Description"
					value={editProductData.data.description}
					onChange={handleChange}
					id="description"
				/>

				<input
					className="form-control"
					name="image"
					placeholder="Image"
					value={editProductData.data.image}
					onChange={handleChange}
					id="image"
				/>

				<button type="submit" className="btn btn-primary w-25">
					Save
				</button>
			</form>
		</div>
	);
};
