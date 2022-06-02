import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const AudioFeedHolder = () => {
  const audioPlayer = useRef();
  const [playAudio, setPlayAudio] = useState(false);
  const audioFile = "/static/audio/track01.mp3";

  // const contolePlay = (url, timeout) => {
  //   pauseAudio();
  //   stopReplay();

  //   setTimeout(() => {
  //     playAudio();
  //   }, timeout);

  //   return url;
  // };

  // const contoleReplay = (timeout) => {
  //   pauseAudio();

  //   setTimeout(() => {
  //     playAudio();
  //   }, timeout);
  // };

  useEffect(() => {
    setTimeout(() => {
      setPlayAudio(true);
    }, 2000);

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);

    const audioControle = (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.05);
      sound.play();
    };
    const audioLoader = new THREE.AudioLoader();

    // const track = new Audio(audioFile);
    // track.play();

    const audioAnalyzer = new THREE.AudioAnalyser(sound, 64);
    console.log(audioAnalyzer.data);

    if (playAudio) {
      console.log("play");
      audioLoader.load(audioFile, audioControle);
    }
  }, [playAudio]);

  return (
    <audio ref={audioPlayer} id={"audio"} muted={false} src={audioFile}></audio>
  );
};

export default AudioFeedHolder;
