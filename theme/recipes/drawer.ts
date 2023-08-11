import { dialogAnatomy } from '@ark-ui/react'
import { defineSlotRecipe } from '@pandacss/dev'

export const drawer = defineSlotRecipe({
  className: 'drawer',
  description: 'A drawer style',
  slots: dialogAnatomy.keys(),
  base: {
    backdrop: {
      inset: '0',
      position: 'fixed',
      zIndex: '50',
      background: 'background',
      opacity: '0.8',
      backdropBlur: 'sm',
    },
    container: {
      alignItems: 'flex-start',
      display: 'flex',
      inset: '0',
      justifyContent: 'flex-start',
      position: 'fixed',
      zIndex: '50',
    },
    content: {
      background: 'background',
      boxShadow: 'lg',
      position: 'relative',
      height: 'full',
      minW: 'xs',
      py: '6',
      px: '4',
      overflowY: 'auto',
      transition: 'ease-in-out',
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'lg',
      color: 'foreground',
    },
    description: {
      color: 'muted.foreground',
      textStyle: 'sm',
    },
  },
})
