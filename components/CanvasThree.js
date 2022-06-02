import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stats } from "@react-three/drei";
import { Preload, AdaptiveDpr, OrbitControls } from "@react-three/drei";
import VideoScreen from "./VideoScreen";
import CamFeedHolder from "./CamFeedHolder";
import AudioReactor from "./AudioReactor";
import AudioFeedHolder from "./AudioFeedHolder";

const CanvasThree = () => {
  const [videoFeed, setVideoFeed] = useState();
  const [camColorScreen, setCamColorScreen] = useState();

  const getVideoFeed = (video, camScreen) => {
    setVideoFeed(video);
    setCamColorScreen(camScreen);
  };

  return (
    <div className="canvas-three">
      <Stats />
      <CamFeedHolder getVideoFeed={getVideoFeed} />
      {/* <AudioFeedHolder /> */}
      <Canvas
        performance={{ max: 0.5 }}
        gl={{ antialias: false }}
        dpr={[1, 2]}
        camera={{
          // add:listener,
          fov: 35,
          position: [0, 3, 20],
          far: 100,
          near: 0.1,
        }}
      >
        <color attach="background" args={["#191920"]} />
        <OrbitControls />

        <directionalLight
          intensity={1}
          color={"white"}
          position={[0, 5, 4]}
          rotation={[0, 0, -5]}
        />
        {/* <ambientLight intensity={0.5} color={"white"} /> */}

        <Suspense fallback={null}>
          <AudioReactor videoFeed={videoFeed} camColorScreen={camColorScreen} />
          {/* <VideoScreen videoFeed={videoFeed} /> */}
        </Suspense>

        <Preload all />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
};

export default CanvasThree;
