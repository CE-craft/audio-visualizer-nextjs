import { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const CamFeedHolder = ({ getVideoFeed }) => {
  const videoTexture = useRef();

  useEffect(() => {
    videoTexture.current.video.classList.add("video");
    getVideoFeed(videoTexture.current);
  });

  return <Webcam audio={false} ref={videoTexture} />;
};

export default CamFeedHolder;
