import { Component } from 'solid-js'
import { ModeToggle } from '~/components/marketing/mode-toggle'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { Flex } from '~/panda/jsx'
import IconSearch from '~icons/carbon/search'

const Home: Component = () => {
  return (
    <>
      <Flex justify="space-between" align="center">
        <h5>MemoX</h5>
        <Flex justify="end" align="center">
          <Button variant="ghost" size="sm" class={css({ w: 9, px: 0 })}>
            <IconSearch class={css({ h: '1.2rem', w: '1.2rem' })} />
          </Button>
          <ModeToggle />
        </Flex>
      </Flex>
    </>
  )
}

export default Home
