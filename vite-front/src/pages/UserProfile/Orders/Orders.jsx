import React from "react";
import "./Orders.css";

export const Orders = () => {

  return (
    <div className="orders-container">
      
          <div  className="ordered-items-card">
            <div className="order-id-container">
              <span>Order ID: </span>
              <span></span>
            </div>
            <div className="payment-id-container">
              <span>Payment ID: </span>
              <span></span>
            </div>
            <div className="price-container">
              <span>Amount: </span>
              <span></span>
            </div>
            <div className="price-container">
              <span>Delivery-Address:</span>
              <span>
              </span>
            </div>
            <div className="products-container">

                  <div className="products-card" key="">
                    <img src="" alt="" />
                    <div className="description">
                      <span className="name">Name: </span>
                      <span className="qty">Qty: </span>
                      <span className="price">Price: </span>
                    </div>
                  </div>

            </div>
          </div>
          
    </div>
  );
};
