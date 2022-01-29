import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
const modelUrl = '/ninja.gltf';



const Home: NextPage = () => {

    //const nodes = useGLTF(modelUrl);
    

    return (
        <>
            123
            <Canvas
                mode='concurrent'
            >
                <Preload all />
            </Canvas>
        </>
    )
}
//
export default Home
