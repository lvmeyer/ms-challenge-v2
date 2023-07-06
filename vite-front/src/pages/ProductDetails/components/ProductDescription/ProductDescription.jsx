import "./ProductDescription.css";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const ProductDescription = ( ) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_GW_HOSTNAME+`/api/v1/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
      .then(response => response.json())
      .then(data => {
        setSelectedProduct(data.data);
      });
  }, []);


  return (
    <div className="product-details-description">
      {selectedProduct && (
        <>
          <h1 className="product-name">{selectedProduct.name}</h1>

          <div className="ratings-reviews">
            <span></span>
            <span></span>{" "}
            <BsFillStarFill color={"orange"} />
            <span>
              <span className="review">reviews </span>
            </span>
          </div>

          <div className="product-price-container">
            <span className="product-discount-price">
              {selectedProduct.price}$
            </span>
          </div>

          <p className="description-container">
            <span>Description</span>: {selectedProduct.description}
          </p>

          <span className="gender-container">
            <span>Catégorie</span>: 
          </span>

          <div className="tags">
              <span className="out-of-stock">
              </span>
              <span className="trending">
              </span>
          </div>
          <div className="product-card-buttons-container">
            {userInfo && (userInfo.role === "ADMINISTRATOR") ? (
              <></>
            ) : userInfo && (userInfo.role === "USER") ? ( 
              <button
                className="add-to-cart-btn"
              >
                Add to cart 
              </button>
            ) : (
              <></>
            )}
            <button
              className="add-to-wishlist-btn"
              onClick={() => navigate("/product-listing")}
            >
              Back to products
            </button>
          </div>
        </>
      
      )}
    </div>
  );
};
