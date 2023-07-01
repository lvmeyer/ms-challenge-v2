import React from "react";
import { Link } from "react-router-dom";
import "./CategoriesSection.css";

export const CategoriesSection = () => {

  const allCategories = [
    {
      _id: "60f2a1b3e6b6b3b2f0b9b0a1",  
      categoryName: "Shoes",
      img: "https://www.madmoizelle.com/wp-content/uploads/2012/01/chaussure-plus-moche-monde.jpg", 
    },
    {
      _id: "60f2a1b3e6b6b3b2f0b9b0a2",
      categoryName: "Shoes",
      img: "https://www.madmoizelle.com/wp-content/uploads/2012/01/chaussure-plus-moche-monde.jpg",
    },
    {
      _id: "60f2a1b3e6b6b3b2f0b9b0a3",
      categoryName: "Shoes",
      img: "https://www.madmoizelle.com/wp-content/uploads/2012/01/chaussure-plus-moche-monde.jpg",
    },
  ]
  
  return (
    <div>
      <h1 className="categories-heading">Shop By Categories</h1>
      <div className="categories-container">
        {allCategories.map(({ _id, categoryName, img }) => (
          <Link
            
            to="/product-listing"
            className="category-card"
            key={_id}
          >
            <h3>{categoryName}'s</h3>
            <div className="img-cont">
              <img src={img} alt={categoryName} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
