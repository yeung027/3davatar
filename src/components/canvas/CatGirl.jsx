import React, { Suspense, createRef, Component } from 'react'
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { MeshStandardMaterial, AnimationMixer, MeshBasicMaterial } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const retryInterval = 23;
let gltf  = null;

let basecolor;
let height;
let metallic;
let normal;
let roughness;

function Asset({ url })
{
  gltf = useLoader(FBXLoader, url);
  return <primitive object={gltf} position={[0, -5.4, 0]} scale={[0.016, 0.016, 0.016]} />;
}//END Asset

function Texture(props)
{
  const parent = props.parent;
  let loaded = false;

  const [a, b, c, d, e] = useLoader(TextureLoader, [
    '/catgirl/girlA_cloth.png',
    '/catgirl/girlA_face.png',
    '/catgirl/girlA_hair.png',
    '/catgirl/girlA_lofer.png',
    '/ninja/texture/roughness.png',
  ]);

  basecolor = a;
  height = b;
  metallic = c;
  normal = d;

  if (!loaded)
  {
    

  
    parent.sendMaterial(null);
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
      mixer: null,
      animationPlaying: false
    }//END state


    this.isMaterialApplied = false;

    this.sendMaterial = this.sendMaterial.bind(this);
    this.applyMaterial = this.applyMaterial.bind(this);
    this.applyMaterialToModel = this.applyMaterialToModel.bind(this);
    this.setMixed = this.setMixed.bind(this);
    this.playAnim = this.playAnim.bind(this);
    
  }//END constructor


  sendMaterial(material)
  {
    this.applyMaterial(material);
  }//END sendMaterial

  applyMaterial(material)
  {
    if (this.isMaterialApplied) return;
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

  applyMaterialToModel(mat)
  {
    if (gltf === null) return false;

    const material = new MeshBasicMaterial({
      map: basecolor
    });

    const material2 = new MeshBasicMaterial({
      map: metallic
    });

    const material3 = new MeshBasicMaterial({
      map: height
    });

    const material4 = new MeshBasicMaterial({
      map: normal
    });

    //console.log(gltf);
    gltf.traverse((o) => {

      if (o.isMesh) {
        
        o.material[0] = material;
        o.material[1] = material2;
        o.material[2] = material3;
        o.material[3] = material4;
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
    this.playAnim();
    


  }//END componentDidMount


  playAnim()
  {
    
    if (this.state.mixer != null)
    {
      if (gltf.animations && gltf.animations.length>0)
        this.state.mixer.clipAction(gltf.animations[0]).play();
    }
    else
    {
      this.setMixed();
      setTimeout(
        function () {

          this.playAnim();
        }
          .bind(this),
        retryInterval
      );
    }


  }//END playAnim

  setMixed()
  {
    if (gltf === null) return false;
    let mixer = new AnimationMixer(gltf);
    this.setState({ mixer: mixer });
    return true;
  }//END setMixed

  
  render()
  {
    let useFrameLogicDOM = <></>

    if (this.state.mixer != null) {
      console.log(gltf.animations.length);
        //this.state.mixer.clipAction(gltf.animations[1]).play();
        
      
      useFrameLogicDOM = <><UseFrameLogic parent={this} mixer={this.state.mixer} /></>
    }
    else this.setMixed();
    
    return (
      <Suspense fallback={<>Loading...</>} r3f>
        <Texture parent={this} />
        <Asset url="/catgirl/catgirl.fbx" />
        {useFrameLogicDOM}
      </Suspense>
    )
  }
  
}
export default Model
