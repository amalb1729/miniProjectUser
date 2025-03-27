import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
 
  plugins: [react()],
  server: {
    port: 5174, // Change this to your desired port
  
    proxy:{
      '/api':{
          target:process.env.VITE_API,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
},
})
