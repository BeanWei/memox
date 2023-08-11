import { popoverAnatomy } from '@ark-ui/solid'
import { defineSlotRecipe } from '@pandacss/dev'

export const popover = defineSlotRecipe({
  className: 'popover',
  description: 'A popover styles',
  slots: popoverAnatomy.keys(),
  base: {
    positioner: {
      zIndex: '50',
    },
    content: {
      bg: 'popover.default',
      color: 'popover.foreground',
      outline: 'none',
      borderRadius: 'md',
      borderWidth: '1px',
      boxShadow: 'md',
      maxWidth: 'sm',
      _open: {
        animation: 'fadeIn 0.25s ease-out',
      },
      _closed: {
        animation: 'fadeOut 0.2s ease-out',
      },
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    description: {
      color: 'muted.foreground',
      textStyle: 'sm',
    },
    closeTrigger: {
      color: 'muted.foreground',
    },
    arrow: {
      '--arrow-size': '12px',
      '--arrow-background': {
        base: 'white',
        _dark: 'colors.neutral.950',
      },
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
    },
  },
})
