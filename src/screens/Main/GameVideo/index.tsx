import React from "react";
import { images, VIDEO_URL } from "../../../consts";

function GameVideo() {
  return (
    <div className="game-video">
      <figure></figure>
      <video
        autoPlay
        loop
        muted
        className="video"
        src={VIDEO_URL}
        poster={images.poster}
      ></video>
    </div>
  );
}

export default GameVideo;
