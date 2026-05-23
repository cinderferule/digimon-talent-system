/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        combate: '#FF8C00',
        eventos: '#22C55E',
        exploracion: '#3B82F6',
        tamer: '#EF4444',
      },
    },
  },
  plugins: [],
};
