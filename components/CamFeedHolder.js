import { useRef } from "react";

const videoTexture = useRef();
const videoSource = useRef();

const CamFeedHolder = ({ source }) => {
  return (
    <video
      ref={videoTexture}
      crossOrigin="anonymous"
      id={"video"}
      preload="none"
      muted={true}
    >
      <source ref={videoSource} src={source} />
    </video>
  );
};

export default CamFeedHolder;
