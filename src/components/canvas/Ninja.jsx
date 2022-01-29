import React, { Suspense, createRef, Component } from 'react'
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial, AnimationMixer } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const retryInterval = 23;
let gltf  = null;

function Asset({ url })
{
  gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} position={[0, -5, 0]} scale={[0.03, 0.03, 0.03]} />;
}//END Asset

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
    let minigunMaterial = new MeshStandardMaterial({
      map: basecolor,
      displacementMap: height,
      metalnessMap: metallic,
      normalMap: normal,
      roughness
    });

  
    parent.sendMaterial(minigunMaterial);
    loaded = true;
  }//END if (!loaded)
  

  return <></>
}//END Texture


function UseFrameLogic(props)
{
  useFrame((state, delta) => {
    props.mixer?.update(delta)
  })
  return null;
}//END UseFrameLogic

class Model extends Component
{
  
  constructor(props)
  {
    super(props);

    this.state = {
      mixer: null
    }//END state


    this.isMaterialApplied = false;

    this.sendMaterial = this.sendMaterial.bind(this);
    this.applyMaterial = this.applyMaterial.bind(this);
    this.applyMaterialToModel = this.applyMaterialToModel.bind(this);
    this.setMixed = this.setMixed.bind(this);
  }//END constructor


  sendMaterial(material)
  {
    this.applyMaterial(material);
  }//END sendMaterial

  applyMaterial(material)
  {
    if(this.isMaterialApplied) return;
    if (gltf === null || !gltf)
    {
      setTimeout(
        function () {
          //console.log('gltf not loaded yet, retry is pending...');
          this.applyMaterial(material);
        }
          .bind(this),
        retryInterval
      );
      return;
    }//end gltf == null

    if (!this.applyMaterialToModel(material))
      return setTimeout(
        function () {
        
          this.applyMaterial(material);
        }
        .bind(this),
        retryInterval
      );
    this.isMaterialApplied = true;
  }//END applyMaterial

  applyMaterialToModel(material)
  {
    if (gltf === null || !gltf.scene) return false;

    gltf.scene.traverse((o) => {
      if (o.isMesh) {
        o.material = material;
      }
    });

    return true;
    //console.log('finally.....');
  }

  componentWillUnmount()
  {
    this.setMixed();
  }//END componentWillUnmount

  componentDidMount()
  {
    this.setMixed();

    
  }//END componentDidMount

  setMixed()
  {
    if (gltf === null || !gltf.scene) return false;
    let mixer = new AnimationMixer(gltf.scene);
    this.setState({ mixer: mixer });
    return true;
  }//END setMixed

  
  render()
  {
    let useFrameLogicDOM = <></>

    if (this.state.mixer!=null) {
      this.state.mixer.clipAction(gltf.animations[1]).play();
      useFrameLogicDOM = <><UseFrameLogic parent={this} mixer={this.state.mixer} /></>
    }
    else this.setMixed();
    
    return (
      <Suspense fallback={<>Loading...</>} r3f>
        <Texture parent={this} />
        <Asset url="/ninja/ninja.gltf" />
        {useFrameLogicDOM}
      </Suspense>
    )
  }
  
}
export default Model
