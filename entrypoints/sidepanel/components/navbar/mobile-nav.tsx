import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogTrigger,
} from '@ark-ui/solid'
import { A } from '@solidjs/router'
import { Component, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Button } from '~/components/shared/button'
import { css, cx } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { drawer } from '~/panda/recipes'
import IconClose from '~icons/carbon/close'
import IconOpenPanelLeft from '~icons/carbon/open-panel-left'
import IconPenFountain from '~icons/carbon/pen-fountain'

const MobileNav: Component = () => {
  const cls = drawer()
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <Dialog open={isOpen()} onClose={() => setIsOpen(false)}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          class={css({
            mr: '2',
            minW: '0',
            px: '0',
            _hover: {
              bg: 'transparent',
            },
            _focusVisible: {
              bg: 'transparent',
              ring: '0',
              ringOffset: '0',
            },
          })}
          onClick={() => setIsOpen(true)}
        >
          <IconOpenPanelLeft class={css({ h: '5', w: '5' })} />
        </Button>
      </DialogTrigger>
      <Portal>
        <DialogBackdrop class={cls.backdrop} />
        <DialogContainer class={cls.container}>
          <DialogContent class={cx(css({ minWidth: '75%' }), cls.content)}>
            <A
              href="/"
              class={css({ display: 'flex', alignItems: 'center' })}
              onClick={() => setIsOpen(false)}
            >
              <IconPenFountain />
              <styled.span fontWeight="bold" ml="1">
                MemoX
              </styled.span>
            </A>
            <DialogCloseTrigger asChild>
              <Button variant="ghost" size="xs" px="0" position="absolute" top="4" right="4">
                <IconClose class={css({ h: '1.2rem', w: '1.2rem' })} />
              </Button>
            </DialogCloseTrigger>
            <Flex direction="column" gap="3" pl="6" pb="10" my="4">
              <A href="/about" onClick={() => setIsOpen(false)}>
                <styled.span>About</styled.span>
              </A>
              <styled.span
                cursor="pointer"
                onClick={() => {
                  setIsOpen(false)
                  browser.tabs.create({ url: 'https://github.com/BeanWei/memox' })
                }}
              >
                Github
              </styled.span>
            </Flex>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}

export default MobileNav
