import React from "react";
import "../footer/Footer.css";
import { ImGithub } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <small> &copy; {copyrightYear} Bando</small>
      <div className="social-links">
        <Link to="#" target="_blank">
          <BsTwitter />
        </Link>
        <Link to="#" target="_blank">
          <ImGithub />
        </Link>
        <Link to="#" target="_blank">
          <SiLinkedin />
        </Link>
      </div>
    </div>
  );
};
