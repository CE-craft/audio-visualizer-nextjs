import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as faceapi from "face-api.js";
import * as THREE from "three";

const ReactorCore = ({ videoFeed, camColorScreen }) => {
  const core = useRef();
  const [detection, setDetection] = useState({});

  const expressionColors = [
    "#FFFFFF",
    "#FDFF33",
    "#33FF77",
    "#33BBFF",
    "#7733FF",
    "#FF33CE",
    "#CEFF33",
  ];

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
        console.log("Couldn't load models", err);
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
          color3D: new THREE.Color(expressionColors[i]),
          color: expressionColors[i],
        });
      });

      let currentExpression = expressionsArr.find(
        (exp, i) => expressionsArr[i].value > expressionsArr[i + 1].value
      );

      let appliedColor = new THREE.Color();

      if (currentExpression) {
        if (appliedColor !== currentExpression.color3D) {
          appliedColor = currentExpression.color3D;
          camColorScreen.style.backgroundColor = currentExpression.color;
          core.current.color = new THREE.Color(appliedColor);

          // screen.current.uniforms.uExpressionColor.value = appliedColor;
        }
      }
    }

    // let elapsedTime = state.clock.getElapsedTime();
    // core.current.rotation.y = elapsedTime * 0.1;
    // core.current.rotation.z = elapsedTime * 0.1 + Math.PI * 0.5;
  });

  return (
    <group>
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial ref={core} />
      </Sphere>
    </group>
  );
};

export default ReactorCore;
