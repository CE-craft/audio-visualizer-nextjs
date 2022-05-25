import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import ScreenShaderMaterial from "./shaders/ScreenShaderMaterial";

const VideoScreen = ({ videoFeed }) => {
  const screen = useRef();

  const videoTexture = new THREE.VideoTexture(videoFeed.video);

  useFrame((state) => {
    screen.current.uniforms.uVideoTexture.value = videoTexture;
    screen.current.uniforms.uTime.value = state.clock.getElapsedTime();
    screen.current.transparent = true;
    screen.current.blending = THREE.AdditiveBlending;
    screen.current.depthWrite = false;
  });

  return (
    <mesh position={[-0.05, 0.1, 2]}>
      <planeBufferGeometry args={[3.5, 2, 1, 1]} />
      <screenShaderMaterial ref={screen} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default VideoScreen;
