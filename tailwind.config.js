/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8b2323",
        secondary: "#582020",
        itemBackground: "#EAE6DA",
        itemBackgroundHover: "#F0EDE5",
        aboutUs: "#f03e3e",
      },
      gridTemplateColumns: {
        ordersList: "0.3fr 0.2fr 0.2fr 0.3fr",
        mainContainer: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};
