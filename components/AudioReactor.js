import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Effects, Ring, useFBO } from "@react-three/drei";
import ReactorShell from "./reactorComponents/ReactorShell";
//import { VolumetricShaderMaterial } from "./shaders/VolumetricShaderMaterial";
//import { VolumetricLightShader } from "./shaders/VolumetricLightShader";
//import { BlendingShaderMaterial } from "./shaders/BlendingShaderMaterial";
// import { AdditiveBlendingShader } from "./shaders/AdditiveBlendingShader";
// import { FXAAShader } from "three-stdlib";

const AudioReactor = ({ videoFeed, camColorScreen }) => {
  const ring1 = useRef();
  const ring2 = useRef();

  // const shaderPassFXOne = useRef();
  // const shaderPassFXTwo = useRef();

  // const { gl, camera, size } = useThree();
  // const occlusionRenderTarget = useFBO();

  // const uniformsFXPassTwo = {
  //   tDiffuse: null,
  //   lightPosition: new THREE.Vector2(0.5, 0.75),
  //   exposure: 0.3,
  //   decay: 0.95,
  //   density: 0.4,
  //   weight: 0.3,
  //   samples: 50,
  // };

  // const uniformsFXPassOne = {
  //   tDiffuse: null,
  //   tAdd: occlusionRenderTarget.texture,
  // };

  useFrame((state) => {
    let elapsedTime = state.clock.getElapsedTime();

    ring1.current.rotation.z = elapsedTime * 2;
    ring1.current.rotation.x = elapsedTime * 2 + Math.PI * 0.15;

    ring2.current.rotation.y = elapsedTime * 2;
    ring2.current.rotation.x = elapsedTime * 2 + Math.PI * 0.1;
  });

  useEffect(() => {
    ring1.current.rotation.x = Math.PI * 0.5;
    ring1.current.rotation.y = Math.PI * 0.12;

    ring2.current.rotation.x = Math.PI * 0.5;
    ring2.current.rotation.y = Math.PI * -0.12;
  }, []);

  return (
    <>
      <group>
        <Ring ref={ring1} args={[4, 3.5, 64]}>
          <meshStandardMaterial color={"white"} side={THREE.DoubleSide} />
        </Ring>
        <Ring ref={ring2} args={[4, 3.5, 64]}>
          <meshStandardMaterial color={"white"} side={THREE.DoubleSide} />
        </Ring>
        <ReactorShell videoFeed={videoFeed} camColorScreen={camColorScreen} />
      </group>
    </>
  );
};

export default AudioReactor;
