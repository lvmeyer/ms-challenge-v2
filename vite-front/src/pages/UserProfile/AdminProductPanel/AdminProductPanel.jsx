import React, { useState, useEffect } from "react";
import { Logout } from "../../auth/Logout/Logout";
import "./AdminProductPanel.css";
import { ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";



export const AdminProductPanel = () => {



  

  // ----------------PRODUCT FORM-----------------

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

  const navigate = useNavigate();
  // const idProduct = `/edit-product/${productId}`;
  
  
  
  // const handleCancelClick = () => {
  //   setEditMode(false);
  //   setEditProductId(null);
  // };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
    setEditProductData({ ...editProductData, [name]: updatedValue });

  };


    // ----------------DELETE Product---------------

    const handleDeleteClick = (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        fetch(`${import.meta.env.VITE_GW_HOSTNAME}/api/v1/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
          }
        })
          .then(response => {
            if (response.ok) {
              // La suppression a réussi, vous pouvez effectuer les actions nécessaires
              console.log("Product deleted successfully");
              // Par exemple, vous pouvez mettre à jour la liste des produits après la suppression
              fetchProducts();
            } else {
              // La suppression a échoué, vous pouvez afficher un message d'erreur ou effectuer d'autres actions
              console.log("Product deletion failed");
            }
          })
          .catch(error => {
            // Une erreur s'est produite lors de la requête, vous pouvez afficher un message d'erreur ou effectuer d'autres actions
            console.log(error);
          });
      }
    };


    const fetchProducts = () => {
      fetch(`${import.meta.env.VITE_GW_HOSTNAME}/api/v1/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
        }
      })
        .then(response => response.json())
        .then(data => {
          setProducts(data.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    





  // ----------------EDIT Product---------------

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editProductData);
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
          // setFormStatus({ success: true, error: '' });

        })
        .catch(error => {
          console.log(error);
          // if (error.response && error.response.data && error.response.data.message) {
          //   const errorMessage = error.response.data.message[0];
          //   setFormStatus({ success: false, error: errorMessage });
          // } else {
          //   setFormStatus({ success: false, error: 'An error occurred while submitting the form. Please try again.' });
          // }
        });
  };

  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);


  
  
  useEffect(() => {


      // ----------------GET CATEGORY---------------
    
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


        // ----------------Display Product---------------


        fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log("productid",data)
          setProducts(data.data);
        });


        
      

    }, []);
    



  return (
    <div className="container m-5">
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
                          <th scope="col">Image</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(products) && products.map((product) => {
                          const {
                            id,
                            name,
                            price,
                            description,
                            image,
                            category
                          } = product;

                          return (
                            <tr key={id}>
                              <th scope="row">{name}</th>
                              <td>{price}</td>
                              <td>{description}</td>
                              <td>{image}</td>
                              <td>{category}</td>
                              <td>
                              <NavLink
                                to={`/edit-product/${id}`}
                                >
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
  <label Htmlfor="name" className="form-label">Name</label>
    <input className="form-control"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      id="name"
      />
    <label Htmlfor="price" className="form-label">Price</label>
    <input className="form-control"
      name="price"
      placeholder="Price"
      value={formData.price}
      onChange={handleChange}
      id="price"
      />
    <label Htmlfor="description" className="form-label">Description</label>
    <input className="form-control"
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      id="description"
      />
    <label Htmlfor="image" className="form-label">Image</label>
    <input className="form-control"
      name="image"
      placeholder="Image"
      value={formData.image}
      onChange={handleChange}
      id="image"
      />

    <label Htmlfor="image" className="form-label">Category</label>
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
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

</div>


    </div>
  );
};
