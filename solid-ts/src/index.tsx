/* @refresh reload */
import { render } from 'solid-js/web'

import './presentation/css/index.css'
import App from './presentation/App'

const root = document.getElementById('root')

render(() => <App />, root!)
