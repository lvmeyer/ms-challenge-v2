import React, { useState, useEffect } from "react";
import { Logout } from "../../auth/Logout/Logout";
import "./Profile.css";
import { ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { EditProduct } from "./Product/EditProduct";



export const Profile = () => {


  // ------------GET USER INFO-------------------
  const [user, setUser] = useState({});
  useEffect(() => {
      fetch(import.meta.env.VITE_GW_HOSTNAME+'/api/v1/users/me', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
      })
          .then(response => response.json())
          .then(
              console.log(user),
              data => (setUser(data)));
  }, []);

  return (
    <div className="container m-5">
      <div className="list-group w-50">
        <h2>Account</h2>
        <div className="list-group-item">
          <div className="col">Full Name: {user.firstname} {user.lastname}</div>
        </div>

        <div className="list-group-item">
          <span>Email: {user.email}</span>
        </div>
      </div>

    </div>
  );
};
