/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1e3a8a", // Deep Blue
                secondary: "#f472b6", // Pinkish for sweets
                accent: "#f59e0b", // Amber/Gold
                background: "#f8fafc",
                surface: "#ffffff",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
