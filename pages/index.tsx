import type { NextPage } from 'next'
import React, { useRef } from 'react'
//import styles from '../styles/Home.module.css'
import { useGLTF } from "@react-three/drei"
import { Canvas } from '@react-three/fiber'

const modelUrl = '/ninja.gltf';


useGLTF.preload(modelUrl);




const Home: NextPage = () => {

    //const nodes = useGLTF(modelUrl);
    

    return (
        <>
            ...
        </>
    )
}
//
export default Home
