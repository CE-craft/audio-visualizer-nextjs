import * as faceapi from "face-api.js";

// Getting Video stream started

export const getFaceApiInit = async () => {
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
