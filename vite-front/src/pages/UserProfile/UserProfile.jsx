import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./UserProfile.css";

export const UserProfile = () => {

  return (
    (
      <div>
        <div className="user-profile-container">
          <div className="link-container">
            
          </div>
          <Outlet />
        </div>
      </div>
    )
  );
};
