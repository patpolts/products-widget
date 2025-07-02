import type {Config} from 'tailwindcss';

const config:Config = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
}
export default config;