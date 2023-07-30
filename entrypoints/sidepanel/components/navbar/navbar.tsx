import { Component } from 'solid-js'
import { ModeToggle } from '~/components/marketing/mode-toggle'
import { Container, Flex, styled } from '~/panda/jsx'
import MobileNav from './mobile-nav'

const Navbar: Component = () => (
  <styled.header
    backdropBlur="base"
    position="sticky"
    top="0"
    zIndex="40"
    w="full"
    borderBottomWidth="1px"
  >
    <Container display="flex" h="10" alignItems="center">
      <MobileNav />
      <Flex flex="1" justify="end" align="center">
        <ModeToggle />
      </Flex>
    </Container>
  </styled.header>
)

export default Navbar
