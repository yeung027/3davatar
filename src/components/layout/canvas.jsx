import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { PerspectiveCamera } from "@react-three/drei"



const LCanvas = ({ children }) => {


  return (
    <Canvas
      mode='concurrent'
      style={{ background: 'blue', width: '300px', height: '300px', clipPath: 'circle(50% at 50% 50%)' }}
    >
      <Preload all />
      <ambientLight intensity={0.3} />
                    <pointLight position={[35, 43, 30]} intensity={0.5} />
                    <PerspectiveCamera makeDefault far={100} near={0.1} fov={40} position={[0, -4.5, 3]} />
      {children}
    </Canvas>
  )
}

export default LCanvas
