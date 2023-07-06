import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AdminProductPanel } from "./AdminProductPanel/AdminProductPanel";
import "./UserProfile.css";
import { Profile } from "./Profile/Profile";

export const UserProfile = () => {

  return (
    (
      <div>
        <div className="user-profile-container">
          <div className="link-container">
            <Profile/>
          <AdminProductPanel />
            
          </div>
        </div>
      </div>
    )
  );
};
