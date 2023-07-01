import "./ProductDescription.css";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";

export const ProductDescription = ({ selectedProduct }) => {


  return (
    <div className="product-details-description">
      <h1 className="product-name"></h1>

      <div className="ratings-reviews">
        <span></span>
        <span></span>{" "}
        <BsFillStarFill color={"orange"} />
        <span>
          <span className="review">reviews </span>
        </span>
      </div>

      <div className="product-price-container">
        <span className="product-original-price">
        </span>
        <span className="product-discount-price">
        </span>
      </div>

      <p className="description-container">
        <span>Description</span>: 
      </p>

      <span className="gender-container">
        <span>Gender</span>: 
      </span>
      <p className="size-container">
        <span>Size</span>:
      </p>

      <div className="tags">
          <span className="out-of-stock">
          </span>
          <span className="trending">
          </span>
      </div>
      <div className="product-card-buttons-container">
        <button
          className="add-to-cart-btn"
        >
          
        </button>
        <button
          className="add-to-wishlist-btn"
        >

        </button>
      </div>
    </div>
  );
};
