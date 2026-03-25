// tailwind.config.js
import { createConfig } from 'tailwindcss'

export default createConfig({
  darkMode: 'class', // 👈 for class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
