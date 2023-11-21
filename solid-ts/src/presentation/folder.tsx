import { Interactable } from "./utils/interactable/interactable.ts"
import { BillowInteractable } from "./utils/interactable/cloud/billowInteractable";
import { LightingInteractable } from "./utils/interactable/cloud/lightingInteractable";

export type onUpdateInteractable = (data: BillowInteractable | LightingInteractable) => void

function Folder(props: {
  title: string, 
  interactable: BillowInteractable | LightingInteractable, 
  onUpdate: onUpdateInteractable
  }) {
  const { title, interactable, onUpdate } = props;
  const details: { [key: string]: Interactable<any> } = {...interactable};

  return (
  <>
      <li class="folder">
          <input type="checkbox" name="folder" id={title}/>
          <label class="title" for={title}>
              <h2>{title}</h2>
          </label>
          <div class="details">
              {Object.keys(details).map(key => (<Item key={key} interactable={details[key]} onUpdate={() => onUpdate(interactable)}/>)) }
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
