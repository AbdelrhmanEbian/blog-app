/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themes: [{
      light: {
        primary: "white",
        secondary: "#f0f0f0",
        accent: "#626262",
        neutral: "black",
        info: "#0ca6e9",
        success: "#22c55e",
        error: "#ef4444",
      },
    },
      {
        night:{
        primary: "#0f172a",
        neutral: "#ddd",
        secondary: "#1f273a",
        accent: "#a6a6a6",
        info: "#0ca6e9",
        success: "#22c55e",
        error: "#ef4444",


      }}
    ], // 
  },
}