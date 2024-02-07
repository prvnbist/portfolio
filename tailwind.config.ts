import type { Config } from 'tailwindcss'

const config: Config = {
   content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         colors: {
            dark: {
               400: '#19191C',
               300: '#202024',
               200: '#303035',
               100: '#55555F',
            },
            ascent: {
               400: '#1659DB',
               100: '#719DF0',
            },
         },
      },
   },
}
export default config
