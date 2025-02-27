/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif']
            },
            colors: {
                'midnight-blue': '#09005c',
                'glitter': '#E6E7F1',
            },
            backgroundImage: {
                'NySkyline': 'url(src/assets/NYSkyline.jpg)',
            },
        },
    },
    corePlugins: {
    },
    plugins: [
    ],
}