import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import './AdminProductPanel.css';

export const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });

  const [editProductData, setEditProductData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
    setEditProductData({ ...editProductData, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage('Product added successfully'); // Définir le message de succès
        setFormData({
          name: '',
          price: 0,
          description: '',
          image: '',
          category: '',
        }); // Vider les champs du formulaire
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
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      });

    // ----------------Display Product---------------

    // ...
  }, []);

  return (
    <div className="container my-5 width-100">
			<div className="mt-5">
				<form onSubmit={handleSubmit} className="d-flex flex-column">
					<h2>Add a Product</h2>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
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
						<label htmlFor="price" className="form-label">
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
						<label htmlFor="description" className="form-label">
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
						<label htmlFor="image" className="form-label">
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

						<label htmlFor="image" className="form-label">
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
					{successMessage && (
						<p className="text-success mt-2">{successMessage}</p> // Afficher le message de succès
					)}

				</form>
			</div>
		</div>
  );
};
