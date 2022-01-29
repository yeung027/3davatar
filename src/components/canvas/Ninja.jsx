import React, { Suspense, useEffect, useRef } from 'react'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} position={[0, -5, 0]} scale={[0.03, 0.03, 0.03]} />;
}

function Model(props) {
  return (
    <Suspense fallback={<>Loading...</>} r3f>
      <Asset url="/ninja.gltf" />
    </Suspense>
  )
}
export default Model
