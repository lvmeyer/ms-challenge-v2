import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

import React from "react";
import "./Filter.css";

export const Filter = () => {
  const [isFilterMenuOn, setIsFilterMenuOn] = useState(false);

  return (
    <div>
      <div
        className={
          isFilterMenuOn
            ? "filter-container filter-container-mobile-open"
            : "filter-container filter-container-mobile-closed"
        }
      >
        <div
          className={
            !isFilterMenuOn
              ? "filter-header filter-header-mobile-closed"
              : "filter-header filter-header-mobile-open"
          }
        >
          <span
            className="close-tab"
            onClick={() => setIsFilterMenuOn(!isFilterMenuOn)}
          >
            {!isFilterMenuOn ? <TbAdjustmentsHorizontal /> : <RxCross2 />}
          </span>
          <h2>Filters</h2>

        </div>

        <div
          className={
            isFilterMenuOn
              ? "filter-types-container filter-types-container-mobile"
              : "filter-types-container"
          }
        >
          <div className="price-container">
            <h3>Price</h3>
            <div className="price-input-container">
              <label htmlFor="below-200">
                Below $200
                
              </label>

              <label htmlFor="201-999">
                $201 - $999
                
              </label>

              <label htmlFor="1000-1999">
                $1000 - $1999
                
              </label>

              <label htmlFor="above 2000">
                Over $2000
                
              </label>
            </div>
          </div>

          <div className="ratings-container ratings-container-mobile">
            <h3>Ratings (min)</h3>
            <div className="input-range">
              <datalist id="markers">
                <option label="0" value="0">
                  0
                </option>
                <option label="2.5" value="2.5">
                  2.5
                </option>
                <option label="5.0" value="5">
                  5
                </option>
              </datalist>
              
            </div>
          </div>

          <div className="category-container">
            <h3>Categories</h3>
            <div className="category-input-container">
              
            </div>
          </div>

          <div className="sorting-container">
            <h3>Sort by price</h3>

            <div className="sorting-input-container">
              <label htmlFor="high-to-low">
                Price-high to low
                
              </label>

              <label htmlFor="low-to-high">
                Price-low to high
                
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
