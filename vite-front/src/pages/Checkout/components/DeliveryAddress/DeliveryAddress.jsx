import "./DeliveryAddress.css";
import { v4 as uuid } from "uuid";

import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DeliveryAddress = () => {



  const navigate = useNavigate();



  return (
    <div className="delivery-address-container">
      <p>Delivering To</p>

      <div className="delivery-address-description">
        <span className="name">
          Name: 
        </span>
        <span className="address">
          Address: 
        </span>
        <span className="contact">Contact: </span>
        <button className="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
};
