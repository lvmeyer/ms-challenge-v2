import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, logout } from '../../slices/authSlice';

const RequireAuth = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userInfo || !userInfo.access_token) {
    // Rediriger vers la page de connexion
    navigate('/login');
    return null;
  } else {
    return children;
  }
};

export default RequireAuth;
