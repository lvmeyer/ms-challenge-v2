import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import "./CartListing.css";
import imgproduct from '../../../../../public/assets/images/nvidia.jpeg';



export const CartListing = () => {
const [baskedId, setBaskedId] = useState(0);
const [userProducts, setUserProducts] = useState([]);
const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
  fetch('http://localhost:3000/api/v1/user-basket', {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log("basket id", data);
    setBaskedId(data.basketId);

    fetch(`http://localhost:3000/api/v1/basket/${data.basketId}/products`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("basket-user", data.data.products);
      setUserProducts(data.data.products);
      setTotalAmount(data.data.price);
    });
  });
}, []);


  const handlePayment = () => {
    //mets le payement ici chacal
  };

  return (
    <div className="cart-products-container">
      {userProducts.map((userProduct) => (
        <div className="cart-product-card" key={userProduct.id}>
          <div>
            <img className="cart-img" alt={imgproduct} src={imgproduct} />
          </div>
          <div className="product-description">
            <h3>{userProduct.name}</h3>
            <p>Category : {userProduct.category.name}</p>
            <p>Price:${userProduct.price}</p>
          </div>
        </div>
      ))}
    <div className="total-amount">
      Total to pay: ${totalAmount}
    </div>
    <button className="pay-button" onClick={handlePayment}>
      Pay
    </button>
    </div>
  );
};
