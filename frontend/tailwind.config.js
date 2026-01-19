export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#16a34a",
          dark: "#14532d"
        }
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
}
