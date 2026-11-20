module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              primary: "#6366f1", // Indigo-500 equivalent
              "primary-dark": "#4f46e5",
              "background-light": "#f8fafc",
              "background-dark": "#020617",
              "accent-purple": "#a855f7",
              "text-main": "#f8fafc",
              "text-dim": "#94a3b8",
              "border-dark": "#1e293b",
              "card-dark": "#131d27",
          },
          fontFamily: {
              display: ["Outfit", "sans-serif"],
              sans: ["Inter", "sans-serif"],
          },
          borderRadius: {
              DEFAULT: "0.75rem",
              '2xl': '1.5rem',
          },
      },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
