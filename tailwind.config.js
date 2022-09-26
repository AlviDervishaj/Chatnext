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
          "light": "#e0fbfc",
          "dark": "#0f172a",
          "helperText": "#edf6f9",
          "message": {
            "dark": "#3d5a80",
            "light": "#98c1d9",
          }
        },
        "authButton": {
          "light": "#3da5d9",
          "dark": "#247ba0"
        },
        "loading": {
          "light": "#4361ee",
          "dark": "#3a86ff"
        },
      },
      fontFamily: {
        'sans': ['"Open Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      maxHeight: {
        "chatMessage": "88%",
      },
      minWidth: {
        'xs': '6rem',
      },
      backgroundImage: {
        'drake-nothingWasTheSame': "url('/static/images/Nothing Was The Same Wallpaper.jpeg')",
        "kendrick-dontKillMyVibe": "url('/static/images/urbantape.jpeg')",
        'sassyCat': "url('/static/images/Cat Wallpaper Aesthetic.jpeg')",
        'sassyGhost': "url('/static/images/sassy-ghost.jpeg')",
      },
      blur: {
        'xs': '3px',
      }
    },
  },
  plugins: [],
}
