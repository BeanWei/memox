import { Component } from 'solid-js'
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
        <styled.div>
          <styled.textarea
            placeholder="Capture your thoughts..."
            minH="60px"
            w="full"
            bg="transparent"
            fontSize="sm"
            _focusVisible={{ ring: 'none', ringOffset: 'none', shadow: '1' }}
          ></styled.textarea>
        </styled.div>
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
