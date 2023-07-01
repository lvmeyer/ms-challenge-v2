import "./ProductListingSection.css";
import Tilt from "react-parallax-tilt";
import React from "react";

import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

import { BsFillStarFill } from "react-icons/bs";

export const ProductListingSection = () => {

  const sortedProducts = [
    {
      _id: "60f2a1b3e6b6b3b2f0b9b0a1",
      id: 1,
      name: "Nike Air Max 270",
      original_price: 150,
      discounted_price: 120,
      is_stock: true,
      category_name: "ff",
      rating: 4.5,
      reviews: 10,
      trending: true,
      img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1e1d1b1e-1b1e-4b1e-8b1e-1b1e1e1e1e1e/air-max-270-mens-shoe-2X0JcK.jpg",
    },
    {
      _id: "60f2a1b3e6b6b3b2f0b9b0a2",
      id: 2,
      name: "Nike Air Max 270",
      original_price: 150,
      discounted_price: 120,
      is_stock: true,
      category_name: "ff",
      rating: 4.5,
      reviews: 10,
      trending: true,
      img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1e1d1b1e-1b1e-4b1e-8b1e-1b1e1e1e1e1e/air-max-270-mens-shoe-2X0JcK.jpg",
    }
  ]


  return (
    <div className="product-card-container">
      {(
        sortedProducts.map((product) => {
          const {
            _id,
            id,
            name,
            original_price,
            discounted_price,
            category_name,
            is_stock,
            rating,
            reviews,
            trending,
            img,
          } = product;

          return (
            <Tilt
              key={product._id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={false}
              transitionSpeed={2000}
              scale={1.02}
            >
              <div className="product-card" key={_id}>
                <Link to={`/product-details/${id}`}>
                  <div className="product-card-image">
                    <Tilt
                      transitionSpeed={2000}
                      tiltMaxAngleX={15}
                      tiltMaxAngleY={15}
                      scale={1.18}
                    >
                      <img src={img} />
                    </Tilt>
                  </div>
                </Link>

                <div className="product-card-details">
                  <h3>{name}</h3>
                  <p className="ratings">
                    {rating}
                    <BsFillStarFill color="orange" /> ({reviews} reviews){" "}
                  </p>
                  <div className="price-container">
                    <p className="original-price">${original_price}</p>
                    <p className="discount-price">${discounted_price}</p>
                  </div>

                  <p>Gender: {category_name}</p>
                  <div className="info">
                    {!is_stock && <p className="out-of-stock">Out of stock</p>}
                    {trending && <p className="trending">Trending</p>}
                  </div>
                </div>

                <div className="product-card-buttons">
                  <button
                    className="cart-btn"
                  >
                    Go to Cart
                  </button>
                  <button
                    onClick={() => wishlistHandler(product)}
                    className="wishlist-btn"
                  >

                      <AiTwotoneHeart size={30} />

                  </button>
                </div>
              </div>
            </Tilt>
          );
        })
      )}
    </div>
  );
};
