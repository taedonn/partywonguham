/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'gray-e': '#E9EAEE',
        'gray-d': '#D2D4DC',
        'gray-ccc': '#CCCCCC',
        'gray-999': '#999999',
        'gray-666': '#666666',
        'black-333': '#333333',
        'blue-1': '#D4EBFD',
        'blue-2': '#AAD8FB',
        'blue-3': '#7FC4F8',
        'blue-4': '#2A9DF4',
        'blue-4-h': '#4EAAEF',
      },
      animation: {
        "fade-in": "fade-in 0.2s 1 both",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      }
    },
  },
  plugins: [],
}
