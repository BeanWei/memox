import { useNavigate } from '@solidjs/router'
import { Component } from 'solid-js'
import { styled } from '~/panda/jsx'

const About: Component = () => {
  const navigate = useNavigate()

  return (
    <styled.div textAlign="center" onClick={() => navigate('/')}>
      About
    </styled.div>
  )
}

export default About
