import { extend } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";
import { shaderMaterial } from "@react-three/drei";

const BlendingShaderMaterial = shaderMaterial(
  //Uniforms
  {
    tDiffuse: null,
    tAdd: null,
  },
  //Vertex Shader
  glsl` 
  precision mediump float;

  varying vec2 vUv;
  void main() {
  vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  
  `,
  //Fragment shader
  glsl`
  precision mediump float;


    uniform sampler2D tDiffuse;
    uniform sampler2D tAdd;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D( tDiffuse, vUv );
      vec4 add = texture2D( tAdd, vUv );
      gl_FragColor = color + add;
    }
 
  `
);

extend({ BlendingShaderMaterial });

export default BlendingShaderMaterial;
