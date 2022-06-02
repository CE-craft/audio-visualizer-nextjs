import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ReactorCover = () => {
  const cylinders = [];
  const cylRef = useRef([]);
  const fillRefs = (el) => {
    if (el) cylRef.current.push(el);
  };
  const MAX_CYL = 1000;

  /**
   *
   * Audio controle
   */

  const [playAudio, setPlayAudio] = useState(false);
  const audioFile = "/static/audio/track01.mp3";

  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);

  const audioControle = (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.05);
    sound.play();
  };
  const audioLoader = new THREE.AudioLoader();

  const audioAnalyzer = new THREE.AudioAnalyser(sound, 64);

  useEffect(() => {
    setTimeout(() => {
      setPlayAudio(true);
    }, 2000);

    if (playAudio) {
      console.log("play");
      audioLoader.load(audioFile, audioControle);
    }
  }, [playAudio]);

  /**
   *
   * Generate & Controle spikes
   */

  const generatePols = () => {
    for (let i = 0; i <= MAX_CYL; i++) {
      cylinders.push(
        <mesh key={i} ref={fillRefs}>
          <cylinderBufferGeometry args={[0.025, 0.025, 0.5, 16]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      );
    }
  };

  generatePols();

  useFrame((state) => {
    let elapsedTime = state.clock.getElapsedTime();

    const data = audioAnalyzer.getAverageFrequency();
    // console.log(data);

    cylRef.current.forEach((cyl, i) => {
      // number 5 replaces the frequency
      cyl.scale.y = Math.cos(elapsedTime * data * 0.5 + i) * 0.5 + 1;
    });
  });

  useEffect(() => {
    cylRef.current.forEach((cyl, i) => {
      cyl.rotation.x = Math.PI * 2 * Math.random() + i;
      cyl.rotation.z = Math.PI * 2 * Math.random() + i;
      cyl.translateY(2);
    });
  }, []);

  return <>{cylinders.map((cyl) => cyl)}</>;
};

export default ReactorCover;
