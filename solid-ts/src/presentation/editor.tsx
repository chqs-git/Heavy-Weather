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

  const onBillowChangeCb: onUpdateInteractable = (data: BillowInteractable) => onUpdate( buildCloud(cloud(), data.toBillow(), null) );
  const onLightingChangeCb: onUpdateInteractable = (data: LightingInteractable) => onUpdate( buildCloud(cloud(), null, lighting.toLighting()) );
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
              <Folder title={"Cloud Shape"} interactable={billow} onUpdate={onBillowChangeCb}/>
              <Folder title={"Lighting"} interactable={lighting} onUpdate={onLightingChangeCb}/>
            </ul>
      </div>
    </>
  )
}

// @Todo(complete)
function buildCloud(cloud: Cloud, billow: Billow | null, lighting: Lighting | null): Cloud {
  return new Cloud(
    billow ?? cloud.billow,
    lighting ?? cloud.lighting
  );
}

export default Editor;
