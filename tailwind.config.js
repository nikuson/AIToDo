/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', ...require('tailwindcss/defaultTheme').fontFamily.sans],
        'serif': ['ui-serif', 'serif', ...require('tailwindcss/defaultTheme').fontFamily.serif],
        'mono': ['ui-mono', 'monospace', ...require('tailwindcss/defaultTheme').fontFamily.mono],
      },
      colors: {
        'primary': '#3B82F6',
        'secondary': '#6B7280',
        'accent': '#F97316',
        'light': '#F3F4F6',
        'dark': '#1F2937',
      },
    },
  },
  plugins: [],
}
