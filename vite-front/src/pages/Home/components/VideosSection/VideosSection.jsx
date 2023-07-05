import React from "react";
import ReactPlayer from "react-player";
import "./VideosSection.css";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export const VideosSection = () => {
  const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);

  return (
    <>

      {userInfo && (userInfo.role === 'ADMINISTRATOR' || userInfo.role === 'USER') ? (
      <div className="video-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-listing")}
            url={`./assets/videos/hero-video-1.mp4`}
            playing
            playbackRate={1.15}
            muted
            loop
            controls={false}
            width="100%"
            height="119.9%"
          />

          <h3>ASRock AMD Radeon RX 6700</h3>
          <span className="notch"></span>
        </Tilt>{" "}
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-listing")}
            url={`./assets/videos/hero-video-2.mp4`}
            playing
            playbackRate={1.6}
            muted
            loop
            controls={false}
            width="100%"
            height="112.65%"
          />

          <h3>AMD Ryzen 5 5600X</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-listing")}
            url={`./assets/videos/hero-video-3.mp4`}
            playing
            playbackRate={2.8}
            muted
            loop
            controls={false}
            width="100%"
            margin="0px"
            padding="0px"
            height="119.9%"
          />

          <h3>ASUS TUF GAMING B550-PLUS</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          {" "}
          <ReactPlayer
            onClick={() => navigate("/product-listing")}
            url={`./assets/videos/hero-video-4.mp4`}
            playing
            playbackRate={1}
            muted
            loop
            controls={false}
            width="100%"
            height="119.8%"
          />
          <h3>Corsair Vengeance LPX 64GB</h3>
          <span className="notch"></span>
        </Tilt>
      </div>
      ) : (
        <div className="video-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/login")}
            url={`./assets/videos/hero-video-1.mp4`}
            playing
            playbackRate={1.15}
            muted
            loop
            controls={false}
            width="100%"
            height="119.9%"
          />

          <h3>ASRock AMD Radeon RX 6700</h3>
          <span className="notch"></span>
        </Tilt>{" "}
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/login")}
            url={`./assets/videos/hero-video-2.mp4`}
            playing
            playbackRate={1.6}
            muted
            loop
            controls={false}
            width="100%"
            height="112.65%"
          />

          <h3>AMD Ryzen 5 5600X</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/login")}
            url={`./assets/videos/hero-video-3.mp4`}
            playing
            playbackRate={2.8}
            muted
            loop
            controls={false}
            width="100%"
            margin="0px"
            padding="0px"
            height="119.9%"
          />

          <h3>ASUS TUF GAMING B550-PLUS</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          {" "}
          <ReactPlayer
            onClick={() => navigate("/login")}
            url={`./assets/videos/hero-video-4.mp4`}
            playing
            playbackRate={1}
            muted
            loop
            controls={false}
            width="100%"
            height="119.8%"
          />
          <h3>Corsair Vengeance LPX 64GB</h3>
          <span className="notch"></span>
        </Tilt>
      </div>
      )}
    </>
  );
};
