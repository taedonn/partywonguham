/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      'sans': ['Pretendard', 'sans-serif'],
      'serif': ['DNFForgedBlade', 'serif'],
    },
    extend: {
      colors: {
        'gray-f': '#F0F5FA',
        'gray-e': '#E9EAEE',
        'gray-d': '#D2D4DC',
        'gray-c': '#CCCCCC',
        'gray-9': '#999999',
        'gray-6': '#666666',
        'gray-4': '#404240',
        'black-3': '#333333',
        'blue-f': '#F5F9FF',
        'blue-d': '#D4EBFD',
        'blue-c': '#CBDFFF',
        'blue-a': '#AEC4E6',
        'blue-7': '#7285A3',
        'blue-5': '#5194FF',
        'blue-4': '#4EAAEF',
        'blue-2': '#2A9DF4',
        'blue-1': '#1B73E7',
        'blue-0': '#003A99',
        'red-e': '#EB4D3E',
        'yellow-f': '#FFD43B',
      },
      animation: {
        "fade-in": "fade-in 0.2s 1 both",
        "shake": "shake 0.2s 1 both",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "shake": {
          "0%": { transform: "translateX(2px)" },
          "10%": { transform: "translateX(-2px)" },
          "20%": { transform: "translateX(2px)" },
          "30%": { transform: "translateX(-2px)" },
          "40%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "60%": { transform: "translateX(2px)" },
          "70%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
          "90%": { transform: "translateX(-2px)" },
          "100%": { transform: "translateX(0)" },
        }
      }
    },
  },
  plugins: [],
}
