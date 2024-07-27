/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
          primary: "#ffffff", // White background for light theme
          secondary: "#f5f5f5", // Light grey for secondary elements
          accent: "#333333", // Darker grey for accents
          neutral: "#000000", // Black for neutral text
          info: "#0ca6e9", // Info color
          success: "#22c55e", // Success color
          error: "#ef4444", // Error color
        },
      },
      {
        night: {
          primary: "#0f172a", // Dark background for night theme
          secondary: "#1e293b", // Slightly lighter dark background
          accent: "#cbd5e1", // Lighter grey for accents
          neutral: "#e2e8f0", // Light grey for neutral text
          info: "#0ca6e9", // Info color
          success: "#22c55e", // Success color
          error: "#ef4444", // Error color
        },
      },
    ],
  },
};
