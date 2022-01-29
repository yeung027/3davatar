import React, { Suspense, createRef, Component } from 'react'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

let gltf  = null;

function Asset({ url })
{
  gltf = useLoader(GLTFLoader, url);
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
}



class Model extends Component
{
  
  constructor(props)
  {
    super(props);

    this.isMaterialApplied = false;

    this.sendMaterial = this.sendMaterial.bind(this);
    this.applyMaterial = this.applyMaterial.bind(this);
    this.applyMaterialToModel = this.applyMaterialToModel.bind(this);
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
        1000
      );
      return;
    }//end gltf == null

    this.applyMaterialToModel(material);
    this.isMaterialApplied = true;
  }//END applyMaterial

  applyMaterialToModel(material)
  {
    console.log('applyMaterialToModel' + Object.keys(gltf));
    if (gltf === null || !gltf.scene) return false;

    gltf.scene.traverse((o) => {
      if (o.isMesh) {
        o.material = material;
      }
    });

    console.log('finally.....');
  }


  componentDidMount()
  {
    setTimeout(
      function () {
        //console.log('gltf: ' + Object.keys(gltf));
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
