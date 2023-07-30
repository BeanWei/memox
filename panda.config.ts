import { defineConfig } from '@pandacss/dev'
import { globalCss } from '~/theme/global-css'
import { recipes } from '~/theme/recipes'

export default defineConfig({
  preflight: true,
  include: [
    './components/**/*.{js,jsx,ts,tsx}',
    './entrypoints/**/*.{js,jsx,ts,tsx}',
    './theme/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  presets: ['@pandacss/dev/presets'],
  outdir: 'panda',
  jsxFramework: 'solid',
  globalCss,
  conditions: {
    extend: {
      checked: '&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])',
      indeterminate:
        '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])',
      closed: '&:is([data-state=closed])',
      open: '&:is([open], [data-state=open])',
    },
  },
  theme: {
    extend: {
      recipes,
      semanticTokens: {
        colors: {
          border: { value: { base: 'hsl(240 5.9% 90%)', _dark: 'hsl(240 3.7% 15.9%)' } },
          input: { value: { base: 'hsl(240 5.9% 90%)', _dark: 'hsl(240 3.7% 15.9%)' } },
          ring: { value: { base: 'hsl(240 5% 64.9%)', _dark: 'hsl(240 3.7% 15.9%)' } },
          background: { value: { base: 'hsl(0 0% 100%)', _dark: 'hsl(240 10% 3.9%)' } },
          foreground: { value: { base: 'hsl(240 10% 3.9%)', _dark: 'hsl(0 0% 98%)' } },
          primary: {
            default: { value: { base: 'hsl(240 5.9% 10%)', _dark: 'hsl(0 0% 98%)' } },
            foreground: { value: { base: 'hsl(0 0% 98%)', _dark: 'hsl(240 5.9% 10%)' } },
          },
          secondary: {
            default: { value: { base: 'hsl(240 4.8% 95.9%)', _dark: 'hsl(240 3.7% 15.9%)' } },
            foreground: { value: { base: 'hsl(240 5.9% 10%)', _dark: 'hsl(0 0% 98%)' } },
          },
          destructive: {
            default: { value: { base: 'hsl(0 84.2% 60.2%)', _dark: 'hsl(0 62.8% 30.6%)' } },
            foreground: { value: { base: 'hsl(0 0% 98%)', _dark: 'hsl(0 85.7% 97.3%)' } },
          },
          muted: {
            default: { value: { base: 'hsl(240 4.8% 95.9%)', _dark: 'hsl(240 3.7% 15.9%)' } },
            foreground: { value: { base: 'hsl(240 3.8% 46.1%)', _dark: 'hsl(240 5% 64.9%)' } },
          },
          accent: {
            default: { value: { base: 'hsl(240 4.8% 95.9%)', _dark: 'hsl(240 3.7% 15.9%)' } },
            foreground: { value: { base: 'hsl(240 5.9% 10%)', _dark: 'hsl(0 0% 98%)' } },
          },
          popover: {
            default: { value: { base: 'hsl(0 0% 100%)', _dark: 'hsl(240 10% 3.9%)' } },
            foreground: { value: { base: 'hsl(240 10% 3.9%)', _dark: 'hsl(0 0% 98%)' } },
          },
          card: {
            default: { value: { base: 'hsl(0 0% 100%)', _dark: 'hsl(240 10% 3.9%)' } },
            foreground: { value: { base: 'hsl(240 10% 3.9%)', _dark: 'hsl(0 0% 98%)' } },
          },
        },
      },
    },
  },
})
