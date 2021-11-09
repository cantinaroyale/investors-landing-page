import { isMobile } from "react-device-detect";
import { images, VIDEO_URL } from "../../../consts";

function GameVideo() {
  return (
    <div className="game-video">
      <figure></figure>
      <video
        autoPlay={!isMobile}
        loop
        muted
        controls={isMobile}
        className="video"
        src={VIDEO_URL}
        poster={images.poster}
      ></video>
    </div>
  );
}

export default GameVideo;
