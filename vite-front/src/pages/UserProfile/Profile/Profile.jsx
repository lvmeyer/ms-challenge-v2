import React from "react";
import { Logout } from "../../auth/Logout/Logout";
import "./Profile.css";
import { useState, useEffect } from 'react';
import axios from 'axios';


export const Profile = () => {

  // ------------GET USER INFO-------------------
  const [user, setUser] = useState({});
  useEffect(() => {
      fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/users/me', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
      })
          .then(response => response.json())
          .then(
              console.log(user),
              data => (setUser(data)));
  }, []);



  

  // ----------------PRODUCT FORM-----------------

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };


  const [product, setProduct] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    //Envoi des données au serveur
    fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProduct(data);
        setFormStatus({ success: true, error: '' });

      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message[0];
          setFormStatus({ success: false, error: errorMessage });
        } else {
          setFormStatus({ success: false, error: 'An error occurred while submitting the form. Please try again.' });
        }
        });
  };

    // ----------------GET CATEGORY---------------

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
    
          setCategories(data.data);
        });
    }, []);



  return (
    <div className="">
      <div className="profile-container profile-details">
        <div className="name">
          <span>Full Name: {user.firstname} {user.lastname}</span>
          <span>
          </span>
        </div>

        <div className="email">
          <span>Email: {user.email}</span>
          <span> </span>
        </div>
      </div>

      <div className="profile-container profile-details my-5 border-top">
        <h2>Add a Product</h2>
        <div className="name">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            />
          <input
            type="text"
            name="image"
            placeholder="URL Image"
            value={formData.image}
            onChange={handleChange}
          />
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

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}


          <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <Logout />
    </div>
  );
};
