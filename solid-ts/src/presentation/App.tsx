import solidLogo from '/solid.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import { createSignal } from "solid-js"
import { Cloud } from '../domain/cloud/cloud'
import Editor from '../presentation/editor'

function App() {
  const [cloud, setCloud] = createSignal(Cloud.default());

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Heavy Weather</h1>
      <Editor
        cloud={cloud}
        onUpdate={(c: Cloud) => setCloud(c)} // function to update cloud
      />
    </>
  )
}

export default App
