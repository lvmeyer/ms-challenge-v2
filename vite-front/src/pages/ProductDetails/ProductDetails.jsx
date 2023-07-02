import "./ProductDetails.css";
import React from "react";

import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";

export const ProductDetails = () => {


  return (
    (
      <>
        <div className="products-page-container">
          <ProductImage  />
          <ProductDescription />
        </div>
      </>
    )
  );
};
