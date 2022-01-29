import React, { Suspense, useEffect, useRef } from 'react'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

function Model(props) {
  //GLTFLoader = require('@../node_modules/three/examples/jsm/loaders/GLTFLoader').GLTFLoader
  //const group = useRef()
  //const gltf = useLoader(GLTFLoader, '/ninja.gltf')
  return (
    <Suspense fallback={null} r3f>
      <Asset url="/ninja.gltf" />
    </Suspense>
  )
}
export default Model
