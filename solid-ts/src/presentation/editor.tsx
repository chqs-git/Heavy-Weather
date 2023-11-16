import { Scene } from '../domain/scene.ts'
import './css/editor.css'
import Folder from "./folder.tsx";
import { Cloud } from "../domain/cloud/cloud.ts"
import { Accessor } from 'solid-js';
import { BillowInteractable } from "./utils/interactable/cloud/billowInteractable";
import { LightingInteractable } from "./utils/interactable/cloud/lightingInteractable";


function Editor(props: {width: number, height: number, cloud: Accessor<Cloud>, onUpdate: (cloud: Cloud) => void}) {
  const { width, height, cloud, onUpdate } = props;
  const initialCloud = cloud();
  const lighting = new LightingInteractable(initialCloud.lighting);
  const billow = new BillowInteractable(initialCloud.billow);

  const onChangeCallback = () => onUpdate(buildCloud());
  
  return (
    <>
      <div class="row">
            <div class="render">
              <Scene
                width={width} 
                height={height} 
                cloud={cloud}
              />
            </div>
            
            <div class="settings">
              <Folder title={"Cloud Shape"} details={{...billow}} onUpdate={onChangeCallback}/>
              <Folder title={"Lighting"} details={{...lighting}} onUpdate={onChangeCallback}/>
            </div>
      </div>
    </>
  )
}

// @Todo(complete)
function buildCloud(): Cloud {
  return Cloud.default();
}

export default Editor;
