import { Route, Router, Routes, memoryIntegration } from '@solidjs/router'
import { lazy } from 'solid-js'
import { css } from '~/panda/css'

const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))

export default function App() {
  return (
    <Router source={memoryIntegration()}>
      <div class={css({ p: 2 })}>
        <Routes>
          <Route path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
        </Routes>
      </div>
    </Router>
  )
}
