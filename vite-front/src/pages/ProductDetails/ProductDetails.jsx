import "./ProductDetails.css";
import React from "react";
import { useParams } from "react-router-dom";

import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";

export const ProductDetails = () => {
  const { productId } = useParams();



  return (
    (
      <>
        <div className="products-page-container">
          <ProductImage  />
          <ProductDescription  />
        </div>
      </>
    )
  );
};
