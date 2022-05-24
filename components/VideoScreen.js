import ScreenShaderMaterial from "./shaders/ScreenShaderMaterial";

const VideoScreen = () => {
  return (
    <mesh position={[-0.05, 0.1, 2]}>
      <planeBufferGeometry args={[3.5, 2, 1, 1]} />
      <screenShaderMaterial ref={screen} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default VideoScreen;
