import "./ProductListingSection.css";
import Tilt from "react-parallax-tilt";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

import { BsFillStarFill } from "react-icons/bs";

import imgproduct from '../../../../../public/assets/images/nvidia.jpeg';

export const ProductListingSection = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products?sort=desc&limit=17', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  // const sortedProducts = [
  //   {
  //     _id: "60f2a1b3e6b6b3b2f0b9b0a1",
  //     id: 1,
  //     name: "Nike Air Max 270",
  //     original_price: 150,
  //     discounted_price: 120,
  //     is_stock: true,
  //     category_name: "ff",
  //     rating: 4.5,
  //     reviews: 10,
  //     trending: true,
  //     img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1e1d1b1e-1b1e-4b1e-8b1e-1b1e1e1e1e1e/air-max-270-mens-shoe-2X0JcK.jpg",
  //   },
  //   {
  //     _id: "60f2a1b3e6b6b3b2f0b9b0a2",
  //     id: 2,
  //     name: "Nike Air Max 270",
  //     original_price: 150,
  //     discounted_price: 120,
  //     is_stock: true,
  //     category_name: "ff",
  //     rating: 4.5,
  //     reviews: 10,
  //     trending: true,
  //     img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1e1d1b1e-1b1e-4b1e-8b1e-1b1e1e1e1e1e/air-max-270-mens-shoe-2X0JcK.jpg",
  //   }
  // ]

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
                {/* <p className="ratings">
                  {rating} <BsFillStarFill color="orange" /> ({reviews} reviews)
                </p> */}
                <div className="price-container">
                  <p className="original-price">${price}</p>
                </div>
  
                {/* <p>Gender: {category_name}</p> */}
                <div className="info">
                  {/* {!is_stock && <p className="out-of-stock">Out of stock</p>}
                  {trending && <p className="trending">Trending</p>} */}
                </div>
              </div>
  
              <div className="product-card-buttons">
                <button className="cart-btn">Go to Cart</button>
                {/* <button
                  onClick={() => wishlistHandler(product)}
                  className="wishlist-btn"
                >
                  <AiTwotoneHeart size={30} />
                </button> */}
              </div>
            </div>
          </Tilt>
        );
      })}
    </div>
  );
};