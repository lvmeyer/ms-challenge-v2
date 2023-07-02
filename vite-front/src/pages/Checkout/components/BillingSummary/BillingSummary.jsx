import React from "react";
import "./BillingSummary.css";

export const BillingSummary = () => {
  

  return (
    <div className="billing-container">
      <div className="price-details-container">
        <div>
          <span className="subtotal">Subtotal</span>
        </div>

        <div>
          <span className="subtotal">Discount</span>
          <span>
           
          </span>
        </div>

        <div>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div>
          <span>Total</span>
        </div>
      </div>
    </div>
  );
};
