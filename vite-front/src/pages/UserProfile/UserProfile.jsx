import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./UserProfile.css";
import { Profile } from "./Profile/Profile";
import { AdminCommentPanel } from "./PanelAdmin/AdminCommentPanel";

export const UserProfile = () => {


  return (
    (
      <div>
        <div className="user-profile-container">
          <div className="link-container">
            <Profile />
            <AdminCommentPanel />
          </div>
        </div>
      </div>
    )
  );
};
