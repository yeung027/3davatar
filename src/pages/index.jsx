import dynamic from 'next/dynamic'
import { useGLTF } from "@react-three/drei"

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

const Ninja = dynamic(() => import('@/components/canvas/Ninja'), {
  ssr: false,
})

// canvas components goes here
const R3F = () => {
  return (
    <>
      <LCanvas>
        <Ninja />
      </LCanvas>
    </>
  )
}

const Page = () => {
  return (
    <>
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
