import { Component } from 'solid-js'
import { styled } from '~/panda/jsx'
import { MemoEditor } from '../components/memo/memo-editor'

const Home: Component = () => {
  return (
    <>
      <styled.div
        rounded="md"
        borderWidth="1px"
        bg="card.default"
        color="card.foreground"
        shadow="xs"
        p="2"
      >
        <MemoEditor editable />
      </styled.div>
    </>
  )
}

export default Home
