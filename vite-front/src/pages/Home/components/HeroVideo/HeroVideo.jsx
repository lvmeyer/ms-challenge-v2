import "./HeroVideo.css";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

import React from "react";

export const HeroVideo = () => {
  const Navigate = useNavigate();
  return (
    <div className="hero-video-container">
      <div className="hero-video">
        <ReactPlayer
          url={`./assets/videos/video-3.mp4`}
          playing
          playbackRate={1.5}
          muted
          loop
          controls={false}
          width={"100%"}
          height={"100%"}
        />
      </div>

      <div className="hero-text">
        <h1>Getting closer to perfection</h1>
        <h2>Where adventure meets beauty in a blaze of cutting-edge technology</h2>
      </div>

      <button
        onClick={() => Navigate("product-listing")}
        className="shop-now-btn"
      >
        Shop Now
      </button>
    </div>
  );
};
