import React from "react";
import { Logout } from "../../auth/Logout/Logout";
import "./Profile.css";
import { useState, useEffect } from 'react';

export const Profile = () => {

  const [user, setUser] = useState({});
  useEffect(() => {
      fetch('http://localhost:3000/api/v1/users/me', {
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
    <div className="profile-container">
      <div className="profile-details">
        <div className="name">
          <span>Full Name: {user.firstname} {user.lastname}</span>
          <span>
          </span>
        </div>

        <div className="email">
          <span>Email: {user.email}</span>
          <span> </span>
        </div>
      </div>
      <Logout />
    </div>
  );
};
