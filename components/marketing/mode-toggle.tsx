import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '@ark-ui/solid'
import { Component } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { menu } from '~/panda/recipes/menu'
import IconSun from '~icons/carbon/sun'

export const ModeToggle: Component = () => {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="sm" class={css({ w: 9, px: 0 })}>
          <IconSun class={css({ h: '1.2rem', w: '1.2rem' })} />
        </Button>
      </MenuTrigger>
      <Portal>
        <MenuPositioner class={menu()}>
          <MenuContent>
            <MenuItem id="light">Light</MenuItem>
            <MenuItem id="dark">Dark</MenuItem>
            <MenuItem id="system">System</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}
