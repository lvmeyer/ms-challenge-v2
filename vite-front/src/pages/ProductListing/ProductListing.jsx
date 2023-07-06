import React from "react";
import { useState } from "react";
import "./ProductListing.css";
import { Filter } from "./components/Filter/Filter";
import { ProductListingSection } from "./components/ProductListingSection/ProductListingSection";

export const ProductListing = () => {

  const [filtersData, setFiltersData] = useState(null);

  const handleData = (priceFilter, sortingFilter, categoryFilter) => {
    setFiltersData({
      priceFilter,
      sortingFilter,
      categoryFilter
    });
  };

  return (
    (
      <div className="page-container">
        <Filter className="filters" sendData={handleData} />
        <ProductListingSection className="products-container" filters={filtersData} />
      </div>
    )
  );
};
