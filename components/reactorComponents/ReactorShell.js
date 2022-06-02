import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ReactorCore from "./ReactorCore";
import ReactorCover from "./ReactorCover";

const ReactorShell = ({ videoFeed, camColorScreen, audioSource }) => {
  return (
    <>
      <ReactorCover />
      <ReactorCore videoFeed={videoFeed} camColorScreen={camColorScreen} />
    </>
  );
};
export default ReactorShell;
