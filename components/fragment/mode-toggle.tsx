import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '@ark-ui/solid'
import { Component, Show, createEffect } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useColorMode } from 'solidjs-use'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { menu } from '~/panda/recipes/menu'
import IconMoon from '~icons/carbon/moon'
import IconSun from '~icons/carbon/sun'

export const ModeToggle: Component = () => {
  const cls = menu()
  const { setStore, state } = useColorMode()

  createEffect(() => {
    document.documentElement.classList.toggle('dark', state() === 'dark')
  })

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="sm" class={css({ w: '9', px: '0' })}>
          <Show when={state() === 'light'}>
            <IconSun class={css({ h: '1.2rem', w: '1.2rem' })} />
          </Show>
          <Show when={state() === 'dark'}>
            <IconMoon class={css({ h: '1.2rem', w: '1.2rem' })} />
          </Show>
        </Button>
      </MenuTrigger>
      <Portal>
        <MenuPositioner class={cls.positioner}>
          <MenuContent class={cls.content}>
            <MenuItem class={cls.item} id="light" onClick={() => setStore('light')}>
              Light
            </MenuItem>
            <MenuItem class={cls.item} id="dark" onClick={() => setStore('dark')}>
              Dark
            </MenuItem>
            <MenuItem class={cls.item} id="auto" onClick={() => setStore('auto')}>
              System
            </MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}
