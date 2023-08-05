import { defineRecipe } from '@pandacss/dev'

export const input = defineRecipe({
  className: 'input',
  description: 'A input styles',
  base: {
    display: 'flex',
    h: '9',
    w: 'full',
    rounded: 'md',
    borderWidth: '1px',
    px: '3',
    py: '1',
    fontSize: 'sm',
    lineHeight: 'sm',
    shadow: 'sm',
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'colors',
    transitionDuration: 'colors',
    _file: {
      borderWidth: '0px',
      bgColor: 'transparent',
      fontSize: 'sm',
      lineHeight: 'sm',
      fontWeight: 'medium',
    },
    _focusVisible: { ring: 'none', ringOffset: 'none', shadow: '1' },
    _disabled: { cursor: 'not-allowed', opacity: '0.5' },
  },
})
