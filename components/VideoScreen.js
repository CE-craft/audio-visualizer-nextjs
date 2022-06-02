import * as faceapi from "face-api.js";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { useEmotionStore } from "../store/store";

import ScreenShaderMaterial from "./shaders/ScreenShaderMaterial";

const VideoScreen = ({ videoFeed }) => {
  const screen = useRef();

  const setCurrentEmotionState = useEmotionStore(
    (state) => state.currentEmotionState
  );

  const currentEmotionState = useEmotionStore((state) => state);

  const expressionColors = [
    "#FFFFFF",
    "#FDFF33",
    "#33FF77",
    "#33BBFF",
    "#7733FF",
    "#FF33CE",
    "#CEFF33",
  ];

  const videoTexture = new THREE.VideoTexture(videoFeed.video);

  useEffect(() => {
    const getFaceApiInit = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
      } catch (err) {
        console.log("Shit went down", err);
      }
    };
    getFaceApiInit();
  }, []);

  useFrame(async (state) => {
    let expressionsArr = [];

    const detection = await faceapi
      .detectAllFaces(videoFeed.video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detection[0]) {
      Object.values(detection[0]?.expressions).forEach((val, i) => {
        expressionsArr.push({
          value: val,
          color: new THREE.Color(expressionColors[i]),
        });
      });

      let currentExpression = expressionsArr.find(
        (exp, i) => expressionsArr[i].value > expressionsArr[i + 1].value
      );

      currentEmotionState(currentExpression);

      // console.log(currentExpression);
      let appliedColor = new THREE.Color();

      if (currentExpression) {
        if (appliedColor !== currentExpression.color) {
          appliedColor = currentExpression.color;

          // console.log(appliedColor);
          screen.current.uniforms.uExpressionColor.value = appliedColor;
        }

        // screen.current.uniforms.uExpressionColor.value = new THREE.Color(
        //   currentExpression.color
        // );
        //console.log(currentExpression);
      }
    }

    // screen.current.uniforms.uVideoTexture.value = videoTexture;
    // screen.current.uniforms.uTime.value = state.clock.getElapsedTime();

    // screen.current.transparent = true;
    // screen.current.blending = THREE.AdditiveBlending;
    // screen.current.depthWrite = false;

    console.log(currentEmotionState);
  });

  return (
    <mesh position={[-8, 0.1, 5]}>
      <planeBufferGeometry args={[3, 2, 1, 1]} />
      <screenShaderMaterial ref={screen} />
    </mesh>
  );
};

export default VideoScreen;
