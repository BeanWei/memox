import { Component } from 'solid-js'
import { Editor } from '~/components/fragment/editor'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import IconImage from '~icons/carbon/image'
import IconLink from '~icons/carbon/link'

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
        <Editor
          placeholder="Capture your thoughts..."
          inline
          blocks
          lists
          onBlur={(editor) => {
            console.log(editor.getJSON())
          }}
        />
        <Flex alignItems="center" mt="2" justify="space-between">
          <Flex gap="1">
            <Button variant="ghost" size="xs" px="0">
              <IconImage class={css({ h: '1.2rem', w: '1.2rem' })} />
            </Button>
            <Button variant="ghost" size="xs" px="0">
              <IconLink class={css({ h: '1.2rem', w: '1.2rem' })} />
            </Button>
          </Flex>
          <Button size="xs">Submit</Button>
        </Flex>
      </styled.div>
    </>
  )
}

export default Home
