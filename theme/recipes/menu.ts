import { menuAnatomy } from '@ark-ui/solid'
import { defineSlotRecipe } from '@pandacss/dev'

const baseItemStyle = {
  pos: 'relative',
  display: 'flex',
  cursor: 'default',
  userSelect: 'none',
  alignItems: 'center',
  rounded: 'sm',
  px: '2',
  py: '1.5',
  textStyle: 'sm',
  outline: 'none',
  transition: 'colors',
  _focus: {
    bg: 'accent.default',
    color: 'accent.foreground',
  },
  _hover: {
    bg: 'accent.default',
    color: 'accent.foreground',
  },
  _highlighted: {
    bg: 'accent.default',
    color: 'accent.foreground',
  },
  _disabled: {
    pointerEvents: 'none',
    opacity: '50',
  },
} as const

export const menu = defineSlotRecipe({
  className: 'menu',
  description: 'A menu style',
  slots: menuAnatomy.keys(),
  base: {
    positioner: {
      zIndex: '50',
    },
    separator: {
      bg: 'muted.default',
      borderBottomWidth: '1px',
      my: '1',
      mx: '-1',
    },
    itemGroupLabel: {
      fontWeight: 'semibold',
      px: '2',
      py: '1.5',
      textStyle: 'sm',
    },
    content: {
      minWidth: '8rem',
      overflow: 'hidden',
      borderRadius: 'md',
      borderWidth: '1px',
      boxShadow: 'md',
      bg: 'popover.default',
      p: '1',
      color: 'popover.foreground',
      outline: 'none',
    },
    item: {
      ...baseItemStyle,
    },
    optionItem: {
      ...baseItemStyle,
      '& > *': {
        flex: '1',
        px: '2',
        py: '1.5',
      },
    },
    triggerItem: {
      ...baseItemStyle,
      px: '2',
      py: '1.5',
    },
  },
})
