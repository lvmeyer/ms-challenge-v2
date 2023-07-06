import React from "react";
import ReactDOM from 'react-dom/client';
import { Home } from "../pages/Home/Home";
import { Cart } from "../pages/Cart/Cart";
import { BrowserRouter as Router } from "react-router-dom";
import { 
  Route, 
  Routes,
	RouterProvider, } from "react-router-dom";
import { Login } from "../pages/auth/Login/Login";
import { ProductListing } from "../pages/ProductListing/ProductListing";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
// import { RequiresAuth } from "../components/requires-auth/RequiresAuth";
import { Signup } from "../pages/auth/Signup/Signup";
import { Logout } from "../pages/auth/Logout/Logout";
import { Checkout } from "../pages/Checkout/Checkout";
import { Wishlist } from "../pages/Wishlist/Wishlist";
import { UserProfile } from "../pages/UserProfile/UserProfile";
import { Profile } from "../pages/UserProfile/Profile/Profile";
import { Addresses } from "../pages/UserProfile/Addresses/Addresses";
import { Orders } from "../pages/UserProfile/Orders/Orders";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import Pingpage from "../pages/ping-page";
import { Provider } from "react-redux";
import store from '../store'
import App from '../App'
import {useEffect, useState} from 'react';
import Payment from '../components/Stripe/Payment'
import Completion from '../components/Stripe/Completion'
import {loadStripe} from '@stripe/stripe-js';
import {ProfileProduct} from '../pages/UserProfile/Profile/Product/Product'
import { EditProduct } from '../pages/UserProfile/Profile/Product/EditProduct';

export const NavRoutes = () => {

  const [ stripePromise, setStripePromise ] = useState(null);

  useEffect(() => {
    const stripePublicKey = "pk_test_51IviNhJqYqfbWn1gui3IgmAr493J9bTJcQtzWniQug84wjy4KLchXOyb0HLwPPNng5pkRXYA875XhnEffSUQ2n9Z00OeG28FbA"
    setStripePromise(loadStripe(stripePublicKey));
  }, []);

  return (
    <Routes path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/ping" element={<Pingpage />} />
      <Route
        path="/cart"
        element={
          // <RequiresAuth>
            <Cart />
          // </RequiresAuth>
        }
      />
      <Route
        path="/wishlist"
        element={
          // <RequiresAuth>
            <Wishlist />
          // </RequiresAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/product-listing" element={<ProductListing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product-details/:productId" element={<ProductDetails />} />
      <Route path="/edit-product/:productId" element={<EditProduct />} />

      <Route
        path="/checkout"
        element={
          // <RequiresAuth>
            <Checkout />
          // </RequiresAuth>
        }
      />
      <Route path="/profile" element={<UserProfile />}>
        <Route
          path="/profile/"
          element={
            // <RequiresAuth>
              <UserProfile />
            // </RequiresAuth>
          }
        />
        <Route path="/profile/orders" element={<Orders />} />
        <Route path="/profile/addresses" element={<Addresses />} />
        <Route path="/profile/product/product" element={<ProfileProduct />} />

      </Route>

      <Route path="/payment" element={<Payment stripePromise={stripePromise} />} />
      <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <NavRoutes />
    </Router>
  </Provider>
);