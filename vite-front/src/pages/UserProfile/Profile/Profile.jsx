import React from "react";
import { Logout } from "../../auth/Logout/Logout";
import "./Profile.css";

export const Profile = () => {

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="name">
          <span>Full Name: </span>
          <span>
          </span>
        </div>

        <div className="email">
          <span>Email: </span>
          <span> </span>
        </div>
      </div>
      <Logout />
    </div>
  );
};
