import React, { useState, useEffect } from 'react';
import './AdminProductPanel.css';
import { ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';

export const AdminProductPanel = () => {
	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		description: '',
		image: '',
		category: '',
	});

	const [editProductId, setEditProductId] = useState(null);
	const [editProductData, setEditProductData] = useState({});
	const [product, setProduct] = useState({});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedValue = name === 'price' ? parseFloat(value) : value;
		setFormData({ ...formData, [name]: updatedValue });
		setEditProductData({ ...editProductData, [name]: updatedValue });
	};

	// ----------------DELETE Product---------------

	const handleDeleteClick = (productId) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			fetch(
				`${import.meta.env.VITE_GW_HOSTNAME}/api/v1/products/${productId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer ' +
							JSON.parse(localStorage.getItem('userInfo')).access_token,
					},
				}
			)
				.then((response) => {
					if (response.ok) {
						fetchProducts();
					} else {
						console.error('Product deletion failed');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	const fetchProducts = () => {
		fetch(`${import.meta.env.VITE_GW_HOSTNAME}/api/v1/products`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setProducts(data.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// ----------------EDIT Product---------------

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		// ----------------GET CATEGORY---------------

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
			});

		// ----------------Display Product---------------

		fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/products', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setProducts(data.data);
			});
	}, []);

	return (
		<div className="container my-5 width-100">
			<div className="mt-4">
				<h2>Product List</h2>
				<div className="container">
					<div className="row border-top border-bottom">
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Price</th>
										<th scope="col">Description</th>
										<th scope="col">Stock</th>
										<th className="w-50" scope="col">
											Image
										</th>
										<th scope="col">Category</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(products) &&
										products.map((product) => {
											const { id, name, price, stock, description, image, category } =
												product;

											return (
												<tr key={id}>
													<th
														scope="row"
														className="text-truncate max-width-150"
													>
														{name}
													</th>
													<td>{price}</td>
													<td className="text-truncate max-width-150">
														{description}
													</td>
													{/* <td>{stock} X</td> */}
													<td className="text-truncate max-width-150">
														{image}
													</td>
													<td>{category.name}</td>
													<td>
														<NavLink to={`/edit-product/${id}`}>
															<button
																type="button"
																className="btn btn-primary mx-2"
															>
																Edit
															</button>
														</NavLink>
													</td>
													<td>
														<button
															type="button"
															className="btn btn-danger mx-2 "
															onClick={() => handleDeleteClick(id)}
														>
															Delete
														</button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<ToastContainer position="bottom-right" />
			</div>

			<div className="mt-5">
				<form onSubmit={handleSubmit} className="d-flex flex-column">
					<h2>Add a Product</h2>
					<div className="mb-3">
						<label htmlfor="name" className="form-label">
							Name
						</label>
						<input
							className="form-control"
							name="name"
							placeholder="Name"
							value={formData.name}
							onChange={handleChange}
							id="name"
						/>
						<label htmlfor="price" className="form-label">
							Price
						</label>
						<input
							className="form-control"
							name="price"
							placeholder="Price"
							value={formData.price}
							onChange={handleChange}
							id="price"
						/>
						<label htmlfor="description" className="form-label">
							Description
						</label>
						<input
							className="form-control"
							name="description"
							placeholder="Description"
							value={formData.description}
							onChange={handleChange}
							id="description"
						/>
						{/* <label htmlfor="description" className="form-label">
							Stock
						</label>
						<input
							className="form-control"
							name="Stock"
							placeholder="Stock"
							value={formData.stock}
							onChange={handleChange}
							id="Stock"
						/> */}
						<label htmlfor="image" className="form-label">
							Image
						</label>
						<input
							className="form-control"
							name="image"
							placeholder="Image"
							value={formData.image}
							onChange={handleChange}
							id="image"
						/>

						<label htmlfor="image" className="form-label">
							Category
						</label>
						<select
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label=".form-select-sm example"
						>
							<option value="">Select a category</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
