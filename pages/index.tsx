import type { NextPage } from 'next'

//import styles from '../styles/Home.module.css'
import { useGLTF } from "@react-three/drei"

const Home: NextPage = () => {

    const ninja = useGLTF('/ninja.gltf');

    return (
        <>ninja</>
    )
}

export default Home
