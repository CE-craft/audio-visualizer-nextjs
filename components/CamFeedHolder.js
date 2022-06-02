import { useRef, useEffect } from "react";

import Webcam from "react-webcam";

const CamFeedHolder = ({ getVideoFeed }) => {
  const videoTexture = useRef();
  const camFeedColor = useRef();

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user",
  };

  useEffect(() => {
    getVideoFeed(videoTexture.current, camFeedColor.current);
  }, []);

  return (
    <div className="videoScreen">
      <div ref={camFeedColor} className="videoScreen-blend"></div>
      <Webcam
        videoConstraints={videoConstraints}
        audio={false}
        ref={videoTexture}
      />
    </div>
  );
};

export default CamFeedHolder;
