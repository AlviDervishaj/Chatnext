/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "chat": {
          "light": "#edf6f9",
          "dark": "#0f172a"
        },
        "authButton": {
          "light": "#3da5d9",
          "dark": "#247ba0"
        },
        "loading": {
          "light": "#4361ee",
          "dark": "#3a86ff"
        }
      },
      fontFamily: {
        'sans': ['"Open Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      }
    },
  },
  plugins: [],
}
