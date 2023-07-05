import { useState } from "react";
import "./Cart.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CartListing } from "./components/CartListing/CartListing";
// import { Coupons } from "./components/Coupons/Coupons";
// import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";
// import { useUserData } from "../../contexts/UserDataProvider";

export const Cart = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [couponSelected, setCouponSelected] = useState([]);
  // const { userDataState } = useUserData();
  const navigate = useNavigate();

  if (!userInfo || !userInfo.access_token) {
    // Rediriger vers la page de connexion
    navigate('/login');
    return null;
  }

  return (
    ((
      <div>
        <h1 className="page-heading">Cart</h1>
        <div className="cart-container">
          <CartListing />
          {/* <div>
            <Coupons
              couponSelected={couponSelected}
              setCouponSelected={setCouponSelected}
            />
            <CartAmountSummary couponSelected={couponSelected} />
          </div> */}
        </div>
      </div>
    ))
  );
};
