import "./Header.css";
import { CgHeart } from "react-icons/cg";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { GrSearch } from "react-icons/gr";
import { CgShoppingCart } from "react-icons/cg";
import { logout, setCredentials } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// import requireAuth from '../requires-auth/RequiresAuth';

export const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const storedUserInfo = localStorage.getItem('userInfo');
	// 	const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
	// 	if (userInfo) {
	// 		dispatch(setCredentials(userInfo));
	// 	} else {
	// 		navigate('/login');
	// 		dispatch(logout());
	// 	}
	// }, [dispatch, navigate]);


  const [showHamburger, setShowHamburger] = useState(true);
  const getActiveStyle = ({ isActive }) => {
    return { color: isActive ? "white" : "" };
  };

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

  const LogoBando = '../../../public/assets/icons/logo.png';

  return (
    <nav>
      <div className="nav-logo-home-button">
        <NavLink  to="/">
          <img src={LogoBando} alt="logo" className="brand-logo" />
        </NavLink>
      </div>

      {userInfo && (userInfo.role === 'ADMINISTRATOR' || userInfo.role === 'USER') ? (
      
      <div
        className={
          !showHamburger
            ? "nav-link-container-mobile nav-link-container"
            : "nav-link-container"
        }
      >
        
      <div className="nav-input-search">
        <input
          onKeyDown={(e) => {
            e.key === "Enter" && navigate("/product-listing");
          }}
          placeholder="Search"
        />
        <button>
          <GrSearch />
        </button>
      </div>
      <div>
        <span>{userInfo.email}</span>
      </div>
      <NavLink
        onClick={() => setShowHamburger(true)}
        style={getActiveStyle}
        to="/profile"
      >
        Profile
      </NavLink>
          <NavLink
            onClick={() => setShowHamburger(true)}
            style={getActiveStyle}
            to="/product-listing"
          >
            Explore
          </NavLink>

        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/cart"
        >
          <span>{!showHamburger ? "Cart" : ""}</span>
          <CgShoppingCart size={25} className="cart" />{" "}
        </NavLink>
        <NavLink
          onClick={logoutHandler}
          style={getActiveStyle}
          >
            Logout
        </NavLink>
      </div>
				) : (
          <div>
            <div
              className={
                !showHamburger
                  ? "nav-link-container-mobile nav-link-container"
                  : "nav-link-container"
              }>
            <div>
              <NavLink
                onClick={() => setShowHamburger(true)}
                style={getActiveStyle}
                to="/login"
              >
                Login 
              </NavLink>

            </div>
          </div>
        </div>
        )}

      {showHamburger && (
        <div className="hamburger-icon" onClick={() => setShowHamburger(false)}>
          <RxHamburgerMenu size={20} />
        </div>
      )}
      {!showHamburger && (
        <div
          className="cross-tab-icon cross-tab-icon-mobile"
          onClick={() => setShowHamburger(true)}
        >
          <RxCross2 color={"rgb(106, 106, 65)"} size={25} />
        </div>
      )}
    </nav>
  );
};
