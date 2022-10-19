/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      // これでfont-headingのようにすると設定があたる
      fontFamily: {
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
    },
    container: {
      center: true,
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1000px",
      // => @media (min-width: 1000px) { ... }
      // xl: "1000px",
      // => @media (min-width: 1000px) { ... }
      mmd: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      mlg: { max: "1000px" },
      // => @media (max-width: 1000px) { ... }
    },
    animation: {
      "scale-in-center":
        "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      "tracking-in-expand-fwd":
        "tracking-in-expand-fwd 3s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
    },
    keyframes: {
      "scale-in-center": {
        "0%": {
          transform: "scale(0)",
          opacity: "1",
        },
        to: {
          transform: "scale(1)",
          opacity: "1",
        },
      },
      "tracking-in-expand-fwd": {
        "0%": {
          "letter-spacing": "-.5em",
          transform: "translateZ(-700px)",
          opacity: "0",
        },
        "40%": {
          opacity: ".6",
        },
        to: {
          transform: "translateZ(0)",
          opacity: "1",
        },
      },
    },
  },
  plugins: [],
};

// しまぶーサイトの引用
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   mode: "jit",
//   darkMode: "class",
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//     container: {
//       center: true,
//     },

//     screens: {
//       sm: "640px",
//       // => @media (min-width: 640px) { ... }
//       md: "768px",
//       // => @media (min-width: 768px) { ... }
//       lg: "1000px",
//       // => @media (min-width: 1000px) { ... }
//       // xl: "1000px",
//       // => @media (min-width: 1000px) { ... }
//       mmd: { max: "767px" },
//       // => @media (max-width: 767px) { ... }
//     },
//     fontFamily: {
//       mono: ["YuGothic"],
//     },
//     fontSize: {
//       xs: ".75rem",
//       sm: ".875rem",
//       tiny: ".875rem",
//       base: "1rem",
//       lg: "1.125rem",
//       xl: "1.25rem",
//       "2xl": "1.5rem",
//       "3xl": "1.875rem",
//       "4xl": "2.25rem",
//       "5xl": "3rem",
//       "6xl": "4rem",
//       "7xl": "5rem",
//     },
//     prefix: 'tw-',
//   },
//   plugins: [],
// };
