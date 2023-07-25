import { render } from 'solid-js/web'
import 'uno.css'
import SidePanel from './SidePanel'

const container = document.querySelector('#app')

container && render(SidePanel, container)
