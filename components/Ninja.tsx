import type { NextPage } from 'next'
import {useRef}  from "react";
import { Canvas, useLoader, useThree  } from '@react-three/fiber'

const modelUrl = '/ninja.gltf';
let GLTFLoader


const Ninja: NextPage = (props) => {
   
    GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader
    const group = useRef()
    const gltf = useLoader(GLTFLoader, modelUrl)

    return  (
                <group ref={group} {...props} dispose={null}>
                    <primitive object={gltf.scene} position={[0, -5, 0]} scale={[0.03, 0.03, 0.03]} />
                </group>
            )
}
//
export default Ninja