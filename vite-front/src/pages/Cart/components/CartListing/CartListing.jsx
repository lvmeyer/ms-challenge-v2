import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import "./CartListing.css";


export const CartListing = () => {

  const [baskedId, setBaskedId] = useState(0);
 
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
      console.log(data.basketId);
      setBaskedId(data.basketId);
    });
  }, []);

  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/basket/${baskedId}/products`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUserProducts(data);
    });
  }, [baskedId]);

  

  return (
    <div className="cart-products-container">
      </div>
    // <div className="cart-products-container">
    //   {userDataState.cartProducts.map((product) => (
    //     <div className="cart-product-card" key={product.id}>
    //       <div>
    //         <img className="cart-img" alt={product.name} src={product.img} />
    //       </div>
    //       <div className="product-description">
    //         <h3>{product.name}</h3>
    //         <p>Price:${product.discounted_price}</p>
    //         <p>Size: {product.size}</p>
    //       </div>
    //       <div className="button-section">
    //         <div className="count-btn-container">
    //           <button
    //             disabled={cartLoading}
    //             className="counter-btn"
    //             onClick={() => cartCountHandler(product, "decrement")}
    //           >
    //             -
    //           </button>
    //           <span>{product.qty}</span>
    //           <button
    //             disabled={cartLoading}
    //             className="counter-btn"
    //             onClick={() => cartCountHandler(product, "increment")}
    //           >
    //             +
    //           </button>
    //         </div>
    //         <div className="secondary-btn-section">
    //           <MdDelete
    //             size={25}
    //             onClick={() => removeFromCartHandler(product)}
    //           />

    //           {!isProductInWishlist(product) ? (
    //             <AiOutlineHeart
    //               size={25}
    //               onClick={() => wishlistHandler(product)}
    //             />
    //           ) : (
    //             <AiFillHeart
    //               size={25}
    //               onClick={() => wishlistHandler(product)}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};
