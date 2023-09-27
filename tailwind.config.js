/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./app/**/*.{ts,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    screens: {
      phone: "640px",
      // => @media (min-width: 640px) { ... }

      tablet: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
};
