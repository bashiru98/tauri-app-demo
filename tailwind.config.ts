import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: { colors: {
      'black-rgba': 'rgba(0, 0, 0, 0.3)',
      'very-dark-rgba': 'rgba(0, 0, 0, 0.7)',
      'dark-rgba': 'rgba(8, 14, 44, 0.5)',
    },},
  },
  plugins: [],
}
export default config
