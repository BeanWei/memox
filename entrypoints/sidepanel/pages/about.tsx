import { useNavigate } from '@solidjs/router'
import { Component } from 'solid-js'

const About: Component = () => {
  const navigate = useNavigate()

  return (
    <div class="text-center" onClick={() => navigate('/')}>
      About
    </div>
  )
}

export default About
