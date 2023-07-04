import "./ProductListingSection.css";
import Tilt from "react-parallax-tilt";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

import { BsFillStarFill } from "react-icons/bs";

import imgproduct from '../../../../../public/assets/images/nvidia.jpeg';

export const ProductListingSection = () => {

  const [products, setProducts] = useState([]);
  const [baskedId, setBaskedId] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/user-basket', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
    .then(response => response.json())
    .then(data => {
      setBaskedId(data.basketId);

    fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/products?sort=desc&limit=17', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data.data);
    });
  });
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      toast.info('Product is already in the cart');
    } else {
      fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/basket/add', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
        },
        body: JSON.stringify({
          basketId: baskedId,
          productId: product.id
        })
      })
        .then(response => {
          if (response.ok) {
            setCartItems([...cartItems, product]);
            toast.success('Product added to cart successfully');
          } else {
            throw new Error('Failed to add product to cart');
          }
        })
        .catch(error => {
          console.error(error);
          toast.error('Failed to add product to cart');
        });
    }
  };

  return (
    <div className="product-card-container">
      {Array.isArray(products) && products.map((product) => {
        const {
          id,
          name,
          price,
          description,
          image
        } = product;
  
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
                  <Tilt
                    transitionSpeed={2000}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.18}
                  >
                    <img src={imgproduct} alt={name} />
                  </Tilt>
                </div>
              </Link>
  
              <div className="product-card-details">
                <h3>{name}</h3>
                <div className="price-container">
                  <p className="discount-price">${price}</p>
                </div>
  
                {/* <p>Catégorie: {category_name}</p> */}
                <div className="info">
                  {/* {!is_stock && <p className="out-of-stock">Out of stock</p>}
                  {trending && <p className="trending">Trending</p>} */}
                </div>
              </div>
  
              <div className="product-card-buttons">
              <button className="cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>                
              </div>
            </div>
          </Tilt>
        );
      })}
      <ToastContainer position="bottom-right" />
    </div>
  );
};