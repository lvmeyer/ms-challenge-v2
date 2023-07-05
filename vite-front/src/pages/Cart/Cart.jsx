import { useState } from "react";
import "./Cart.css";

import { CartListing } from "./components/CartListing/CartListing";
// import { Coupons } from "./components/Coupons/Coupons";
// import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";
// import { useUserData } from "../../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const [couponSelected, setCouponSelected] = useState([]);
  // const { userDataState } = useUserData();
  const navigate = useNavigate();

  return (
    ((
      <div>
        <h1 className="page-heading">Cart</h1>
        <div className="cart-container">
          <CartListing />
        </div>
      </div>
    ))
  );
};
