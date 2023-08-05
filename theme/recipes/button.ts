import { defineRecipe } from '@pandacss/dev'

export const button = defineRecipe({
  className: 'button',
  description: 'A button styles',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontSize: 'sm',
    fontWeight: 'medium',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    transitionProperty: 'base',
    transitionDuration: '100',
    transitionTimingFunction: 'ease-out',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    _focusVisible: {
      outline: 'none',
      ringWidth: '2',
      ringColor: 'ring',
      ringOffset: '2',
    },
    _disabled: {
      pointerEvents: 'none',
      cursor: 'not-allowed',
      opacity: '50',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  variants: {
    variant: {
      primary: {
        color: 'primary.foreground',
        backgroundColor: 'primary.default',
        _hover: {
          backgroundColor: 'primary.default',
          opacity: '0.9',
        },
      },
      destructive: {
        color: 'destructive.foreground',
        backgroundColor: 'destructive.default',
        _hover: {
          backgroundColor: 'destructive.default',
          opacity: '0.9',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'input',
        backgroundColor: 'background',
        _hover: {
          backgroundColor: 'accent.default',
          color: 'accent.foreground',
        },
      },
      secondary: {
        color: 'secondary.foreground',
        backgroundColor: 'secondary.default',
        _hover: {
          backgroundColor: 'secondary.default',
          opacity: '0.9',
        },
      },
      ghost: {
        _hover: {
          color: 'accent.foreground',
          backgroundColor: 'accent.default',
        },
      },
      link: {
        color: 'primary.default',
        textUnderlineOffset: '4',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    size: {
      xs: {
        h: '8',
        minW: '8',
        textStyle: 'xs',
        px: '3',
      },
      sm: {
        h: '9',
        minW: '9',
        textStyle: 'sm',
        px: '3.5',
      },
      md: {
        h: '10',
        minW: '10',
        textStyle: 'sm',
        px: '4',
      },
      lg: {
        h: '11',
        minW: '11',
        px: '4.5',
        textStyle: 'md',
      },
      xl: {
        h: '12',
        minW: '12',
        px: '5',
        textStyle: 'md',
      },
      '2xl': {
        h: '15',
        minW: '15',
        px: '7',
        fontSize: 'lg',
      },
    },
  },
})
