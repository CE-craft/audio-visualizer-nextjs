import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr, OrbitControls } from "@react-three/drei";
import VideoScreen from "./VideoScreen";
import CamFeedHolder from "./CamFeedHolder";

const CanvasThree = () => {
  const [videoFeed, setVideoFeed] = useState();

  const getVideoFeed = (video) => {
    setVideoFeed(video);
  };

  return (
    <div className="canvas-three">
      <CamFeedHolder getVideoFeed={getVideoFeed} />
      <Canvas
        performance={{ max: 0.5 }}
        dpr={[1, 2]}
        camera={{
          fov: 40,

          position: [0, 1, 3],
          far: 100,
          near: 0.1,
        }}
      >
        {/* <color attach="background" args={["#191920"]} /> */}
        <OrbitControls />

        <directionalLight
          intensity={1}
          color={"white"}
          position={[0, 5, 4]}
          rotation={[0, 0, -5]}
        />
        <ambientLight intensity={0.5} color={"white"} />
        {/* <mesh position={[0, 0, 0]}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"red"} />
        </mesh> */}

        <VideoScreen videoFeed={videoFeed} />

        <Preload all />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
};

export default CanvasThree;
