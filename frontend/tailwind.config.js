/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ✅ Custom color names
        "custom-bg": {
          light: "#edede9",
          dark: "#060606",
          darkLogin: "#111112",
        },
        fontFamily: {
          serif: ["Playfair Display", "serif"],
          sans: ["Inter", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
