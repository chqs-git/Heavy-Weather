import { Interactable } from "./utils/interactable/interactable.ts"
import { Cloud } from "../domain/cloud/cloud.ts";
import { BillowInteractable } from "./utils/interactable/cloud/billowInteractable.ts";
import { LightingInteractable } from "./utils/interactable/cloud/lightingInteractable.ts";
import { Accessor } from "solid-js";

function Folder(props: {
  title: string, 
  interactable: BillowInteractable | LightingInteractable,
  cloud: Accessor<Cloud>,
  onUpdate: (cloud: Cloud) => void
  }) {
  const { title, interactable, cloud, onUpdate } = props;
  const details: { [key: string]: Interactable<any> } = {...interactable};
  return (
  <>
      <li class="folder">
          <input type="checkbox" name="folder" id={title}/>
          <label class="title" for={title}>
              <h2>{title}</h2>
          </label>
          <div class="details">
              {Object.keys(details).map(key => (
                <Item key={key} interactable={details[key]} onUpdate={() => interactable.onUpdate(cloud(), onUpdate)}/>)) 
              }
          </div>
      </li>
  </>
  )
}

function Item(props: {key: string, onUpdate: () => void, interactable: Interactable<any>}) {
  const { key, interactable, onUpdate } = props;

  return (
    <>
      <div class="item">
          <strong>{key}:</strong>
          {interactable.createElement(onUpdate)}
      </div>
    </>
  )
}

export default Folder;
