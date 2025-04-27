import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'
import mint from '@park-ui/panda-preset/colors/mint'
import sage from '@park-ui/panda-preset/colors/sage'

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: mint,
      grayColor: sage,
      radius: 'xl',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
})
