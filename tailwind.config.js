/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nebula-blue-dark': '#334E68',    // Darker blue for text
        'nebula-blue-med': '#4A6B8A',     // Headings, accents
        'nebula-blue-light': '#5D7E9D',   // Secondary text
        'nebula-blue-soft': '#6C91B7',    // Buttons, links
        'nebula-blue-border': '#A2B9CD',  // Borders
        'nebula-bg-light': '#F0F4F8',     // Main background (light gray/blue)
        'nebula-bg-form': '#E0E6EE',      // Form/container background (muted blue/gray)
        'nebula-bg-input': '#F8F9FA',     // Input field background
        'nebula-ai-bubble': '#D1E8E2',    // AI chat bubble (soft pastel green)
        'nebula-user-bubble': '#FFFACD',  // User chat bubble (light pastel yellow)
        'nebula-text-muted': '#889AA4',   // Footer text
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
