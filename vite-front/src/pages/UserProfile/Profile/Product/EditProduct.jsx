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
			stock: '',
			image: '',
			category: {
				id: '',
			},
		},
	});
	const [categories, setCategories] = useState([]);

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
				setEditProductData(data);
			})
			.catch((error) => {
				console.error(error);
			});

		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/categories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setCategories(data.data);
			})
			.catch((error) => {});
	}, []);

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
		// if (editProductData.data.stock !== '') {
		// 	updatedFields.stock = editProductData.data.stock;
		// }
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
		<div className="container">
			<div className="m-5">
				<form onSubmit={handleUpdate} className="d-flex flex-column">
					<h1 className="text-center">Edit Product</h1>
					<p>Name</p>
					<input
						className="form-control"
						name="name"
						placeholder="Name"
						value={editProductData.data.name}
						onChange={handleChange}
						id="name"
					/>

					<p>Price</p>
					<input
						className="form-control"
						name="price"
						placeholder="Price"
						value={editProductData.data.price}
						onChange={handleChange}
						id="price"
					/>

					<p>Description</p>
					<input
						className="form-control col"
						name="description"
						placeholder="Description"
						value={editProductData.data.description}
						onChange={handleChange}
						id="description"
					/>
					
					{/* <p>Name</p>
					<input
						className="form-control col"
						name="Stock"
						placeholder="Stock"
						value={editProductData.data.stock}
						onChange={handleChange}
						id="Stock"
					/> */}

					<p>Image</p>
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
		</div>
	);
};
