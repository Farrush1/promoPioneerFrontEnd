/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cairo", "sans-serif"],
      },
      boxShadow: {
        t: "0px -3px 15px 1px rgba(0, 0, 0, 0.1)",
      },
    },
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
  },
  plugins: [require("daisyui")],
};
