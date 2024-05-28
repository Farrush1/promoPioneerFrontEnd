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
        t: "0px -2px 3px 1px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-x": "bounce-x 1s infinite",
        marquee: "marquee 13s linear infinite",
      },
      keyframes: {
        "bounce-x": {
          "0%, 100%": {
            transform: "translateX(-10%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": { transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
  },
  plugins: [require("daisyui")],
};
