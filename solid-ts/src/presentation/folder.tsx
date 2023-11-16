import { Interactable } from "./utils/interactable/interactable.ts"

function Folder(props: {title: string, details: { [key: string]: Interactable<any> }, onUpdate: () => void}) {
  const { title, details, onUpdate } = props;

  return (
  <>
      <div class="folder">
          <div class="title">
              <h2>{title}</h2>
          </div>
          <div class="details">
              {Object.keys(details).map(key => (<Item key={key} interactable={details[key]} onUpdate={onUpdate}/>)) }
          </div>
      </div>
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
