import { Scene } from '../3D/scene.ts'
import './css/editor.css'
import './css/settings.css'
import Folder, { onUpdateInteractable } from "./folder.tsx";
import { Cloud } from "../domain/cloud/cloud.ts"
import { Billow } from "../domain/cloud/billow.ts"
import { Lighting } from "../domain/cloud/lighting.ts"
import { Accessor } from 'solid-js';
import { BillowInteractable } from "./utils/interactable/cloud/billowInteractable";
import { LightingInteractable } from "./utils/interactable/cloud/lightingInteractable";
import { onMount } from "solid-js";

function Editor(props: {cloud: Accessor<Cloud>, onUpdate: (cloud: Cloud) => void}) {
  const { cloud, onUpdate } = props;
  const initialCloud = cloud();
  const lighting = new LightingInteractable(initialCloud.lighting);
  const billow = new BillowInteractable(initialCloud.billow);

  onMount(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) Scene(canvas.width, canvas.height, canvas, cloud);
  });
  
  return (
    <>
      <div class="row">
            <div class="render">
              <canvas/>
            </div>
            
            <ul class="settings">
              <div id="fps">0</div>
              <Folder title={"Cloud Shape"} interactable={billow} cloud={cloud} onUpdate={onUpdate}/>
              <Folder title={"Lighting"} interactable={lighting} cloud={cloud} onUpdate={onUpdate}/>
            </ul>
      </div>
    </>
  )
}

export default Editor;
