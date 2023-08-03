import Icons from 'unplugin-icons/vite'
import Solid from 'vite-plugin-solid'
import { defineConfig } from 'wxt'

// See https://wxt.dev/config.html
export default defineConfig({
  manifest: {
    permissions: ['sidePanel', 'unlimitedStorage'],
    icons: {
      '16': 'icon/16.png',
      '32': 'icon/32.png',
      '48': 'icon/48.png',
      '96': 'icon/96.png',
      '128': 'icon/128.png',
    },
  },
  vite: {
    plugins: [
      Solid(),

      // https://github.com/antfu/unplugin-icons
      Icons({
        compiler: 'solid',
        jsx: 'preact',
      }),
    ],
  },
})
