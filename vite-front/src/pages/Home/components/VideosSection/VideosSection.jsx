import React from "react";
import ReactPlayer from "react-player";
import "./VideosSection.css";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

export const VideosSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="video-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-details/47024497-5268-4e4d-861f-fe93a70f55d9")}
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
            onClick={() => navigate("/product-details/455400c6-99df-4d44-85c2-59a56f9c1d3f")}
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
            onClick={() => navigate("/product-details/a18c2743-551a-4ade-ada8-debd7c82d8e5")}
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
            onClick={() => navigate("/product-details/abd16a10-a6d1-4b40-ad9f-51f194d4e30a")}
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
    </>
  );
};
