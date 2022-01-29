import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'




const LCanvas = ({ children }) => {


  return (
    <Canvas
      mode='concurrent'
    >
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
