/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': '1s ease-in-out',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
    themes: [
      {
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
        night: {
          primary: "#0f172a",
          neutral: "#ddd",
          secondary: "#1f273a",
          accent: "#a6a6a6",
          info: "#0ca6e9",
          success: "#22c55e",
          error: "#ef4444",
        },
      },
    ],
  },
};
