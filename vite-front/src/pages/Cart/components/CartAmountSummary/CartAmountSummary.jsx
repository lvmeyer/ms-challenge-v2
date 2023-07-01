import React from "react";
import { Link } from "react-router-dom";
import "./CartAmountSummary.css";

export const CartAmountSummary = ({ couponSelected }) => {


  const isCouponApplied = couponSelected.length ? true : false;

  const placeOrderHandler = () => {
    dispatch({
      type: "SET_ORDER",
      payload: {
        cartItemsTotal: totalOriginalPrice,
        cartItemsDiscountTotal: totalDiscountedPriceAfterCoupon,
        couponDiscountTotal: totalCouponDiscount,
      },
    });
  };

  return (
    <div className="cart-price-container">
      <h1>Summary</h1>
      <div className="subtotal-container">
        <span>Sub-total: </span>
        <span>${totalOriginalPrice}</span>
      </div>
      <div className="discount-container">
        <span>Discount: </span>
        <span>-${totalOriginalPrice - totalDiscountedPriceBeforeCoupon}</span>
      </div>
      {isCouponApplied && (
        <div className="discount-container">
          <span>Coupon Discount: </span>
          <span> -${totalCouponDiscount}</span>
        </div>
      )}
      <div className="shipping-container">
        <span>Estimated Delivery & Handling:</span>
        <span>Free</span>
      </div>
      <div className="total">
        <span className="total-container">Total: </span>
        <span>${totalDiscountedPriceAfterCoupon}</span>
      </div>

      <div className="total-discount-container">
        <span>
          You saved $
          {(totalOriginalPrice - totalDiscountedPriceAfterCoupon).toFixed(2)}{" "}
        </span>
      </div>

      <Link onClick={placeOrderHandler} to="/checkout">
        Place Order
      </Link>
    </div>
  );
};
