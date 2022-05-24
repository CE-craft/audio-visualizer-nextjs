import { extend } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";
import { shaderMaterial } from "@react-three/drei";

const ScreenShaderMaterial = shaderMaterial(
  //Uniforms
  { uTime: 0, uVideoTexture: undefined },
  //Vertex Shader
  glsl` 
  precision mediump float;
  varying vec2 vUv;

  uniform float uTime;
  uniform sampler2D uVideoTexture;

  void main(){



    vec4 color = texture2D( uVideoTexture, vUv );
    float depth = (color.r + color.g + color.b) / 3.0;


    vec4 pos = vec4(position.x, position.y, position.z, 1.0);

    vec4 modelPosition = modelMatrix * pos;

 


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition; 


    vUv = uv;
    }
  
  `,
  //Fragment shader
  glsl`
  precision mediump float;

    uniform float uTime;
    uniform sampler2D uVideoTexture;

    varying vec2 vUv;

    void main(){

    vec4 color = texture2D( uVideoTexture, vUv );
    float depth = (color.r + color.g + color.b) / 3.0;
    float distanceTo = distance(gl_PointCoord, vec2(0.5));

    float display = abs(color.r - (vUv.x * vUv.y))   ;

   

    float strength = 0.5 / distanceTo - 0.1;


        gl_FragColor = vec4(color.r, 0.0,0.0, strength);
    }
 
  `
);

extend({ ScreenShaderMaterial });

export default ScreenShaderMaterial;
