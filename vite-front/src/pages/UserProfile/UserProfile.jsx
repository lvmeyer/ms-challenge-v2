import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import "./UserProfile.css";
import { Profile } from "./Profile/Profile";
import { AdminCommentPanel } from "./PanelAdmin/AdminCommentPanel";

export const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);


  return (
    (
      <div>
        <div className="user-profile-container">
          <div className="link-container">

            {userInfo && (userInfo.role === 'ADMINISTRATOR' ) ? (
              <>
            <Profile />
            <AdminCommentPanel />
              </>
            ) : (
              <>
              <Profile />
              
              </>
            )}

          </div>
        </div>
      </div>
    )
  );
};
