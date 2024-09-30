/** @type {import('tailwindcss').Config} */


module.exports = {
  darkMode: 'media',
  content: [

    './index.html',
    './src/**/*.{vue,js,ts}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx,vue}',
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',],
  theme: {
    extend: {},
  },
  plugins: [  
    require('flowbite/plugin')
  ],
  corePlugins: {
    preflight: false,
  }
}

