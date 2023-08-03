import { Route, Router, Routes, memoryIntegration } from '@solidjs/router'
import { lazy } from 'solid-js'
import { Container } from '~/panda/jsx'
import Navbar from './components/navbar/navbar'

const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))

export default function App() {
  return (
    <Router source={memoryIntegration()}>
      <Navbar />
      <Container py="2" px="0">
        <Routes>
          <Route path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
        </Routes>
      </Container>
    </Router>
  )
}
