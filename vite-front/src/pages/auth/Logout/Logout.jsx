import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

export const Logout = () => {

  return (
    <div className="logout-container">
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
