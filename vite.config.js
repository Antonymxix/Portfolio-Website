import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // Das hier sagt Vite: "Hey, scanne die App.jsx nach Tailwind-Klassen!"
    react(),
  ],
})