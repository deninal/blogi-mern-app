module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html',
  './src/**/*.{js,jsx,ts,tsx,vue}',
  './src/components/*.{js,jsx}',
],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "screen": "calc(100vh - 7rem)"
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
