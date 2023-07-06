import "./ProductDetails.css";
import React from "react";

import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";
import { ProductComments } from "./components/ProductComment/ProductComments";
import { useSelector } from "react-redux";

export const ProductDetails = () => {
  return (
    (
      <>
        <div className="products-page-container">
          <div className="product-details-header">
            <ProductImage  />
            <ProductDescription />
          </div>
          
          <div className="product-details-comment">
            <ProductComments />
          </div>
        </div>
      </>
    )
  );
};
