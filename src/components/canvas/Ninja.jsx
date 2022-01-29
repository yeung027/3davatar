import React, { Suspense, createRef, Component } from 'react'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'


function Asset({ url })
{
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} position={[0, -5, 0]} scale={[0.03, 0.03, 0.03]} />;
}

function Texture(props)
{
  const parent = props.parent;
  let loaded = false;
  const [basecolor, height, metallic, normal, roughness] = useLoader(TextureLoader, [
    '/ninja/texture/basecolor.png',
    '/ninja/texture/height.png',
    '/ninja/texture/metallic.png',
    '/ninja/texture/normal.png',
    '/ninja/texture/roughness.png',
  ]);

  if (!loaded)
  {
    parent.sendTexture(basecolor, height, metallic, normal, roughness);
    loaded = true;
  }
  

  return <></>
}



class Model extends Component
{
  
  constructor(props)
  {
    super(props);

    this.state = {
      textureLoaded: false,
      basecolor: null,
      height: null,
      metallic: null,
      normal: null,
      roughness: null,
    }//END state


  }//END constructor


  sendTexture(basecolor, height, metallic, normal, roughness)
  {
    this.basecolor = basecolor;
    this.height = height;
    this.metallic = metallic;
    this.normal = normal;
    this.roughness = roughness;
    console.log("hello" );
  }

  componentDidMount()
  {


    setTimeout(
      function () {
        console.log("componentDidMount, this.state: " + this.state.textureLoaded);
      }
        .bind(this),
      3000
    );

    
  }//END componentDidMount

  render()
  {
    return (
      <Suspense fallback={<>Loading...</>} r3f>
        <Texture parent={this} />
        <Asset url="/ninja/ninja.gltf" />
      </Suspense>
    )
  }
  
}
export default Model
