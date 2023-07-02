import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

import { useDispatch } from 'react-redux';
export const Logout = () => {
	const dispatch = useDispatch(); 
	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

  return (
    <div className="logout-container">
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
