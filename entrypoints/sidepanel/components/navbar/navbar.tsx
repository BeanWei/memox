import { Component } from 'solid-js'
import { ModeToggle } from '~/components/fragment/mode-toggle'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { Container, Flex, styled } from '~/panda/jsx'
import IconSearch from '~icons/carbon/search'
import MobileNav from './mobile-nav'

const Navbar: Component = () => (
  <styled.header
    bg="background"
    position="sticky"
    top="0"
    zIndex="40"
    w="full"
    borderBottomWidth="1px"
  >
    <Container px="2" py="2" display="flex" h="10" alignItems="center">
      <MobileNav />
      <Flex flex="1" justify="end" align="center">
        <Button variant="ghost" size="sm" class={css({ w: '9', px: '0' })}>
          <IconSearch class={css({ h: '1.2rem', w: '1.2rem' })} />
        </Button>
        <ModeToggle />
      </Flex>
    </Container>
  </styled.header>
)

export default Navbar
