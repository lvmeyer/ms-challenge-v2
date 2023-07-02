import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const navigate = useNavigate();



  return (
    (
      <div>
        <h1 className="page-heading">Wishlist</h1>
        <div className="wishlist-products-container">
            <div className="wishlist-card" key="">
              <div>
                <img
                  className="img-container"
                  alt=""
                  src=""
                />
              </div>

              <div className="product-card-details">
                <h3></h3>
                <p className="ratings">
                  <BsFillStarFill color="orange" />
                </p>
                <div className="price-container">
                  <p className="original-price"></p>
                  <p className="discount-price"></p>
                </div>

                <p>Gender: {product.category_name}</p>
                <div className="info">
                 
                    <p className="out-of-stock">Out of stock</p>

                  <p className="trending">Trending</p>
                </div>
              </div>

              <div className="wishlist-btn-container">
                
                <button
                  className="remove-from-wishlist-btn"
                  onClick={() => removeFromWishlistHandler(product)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>

        </div>
      </div>
    )
  );
};
