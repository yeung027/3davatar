import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import partition from '@/helpers/partition'

const Ninja = dynamic(() => import('@/components/Ninja'), {
    ssr: false,
});



// canvas components goes here
const R3F = () => {
    return (
      <>
        <Ninja />
      </>
    )
  }

const Home: NextPage = () => {

    return (
        <>
            <Canvas
                mode='concurrent'
                style={{ background: 'blue', width: '300px', height: '300px', clipPath: 'circle(50% at 50% 50%)' }}
            >
                <Preload all />
                <R3F  />
            </Canvas>
        </>
    )
}
//
export default Home
