import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      public: "/public",
      api: "/src/api",
      assets: "/src/assets",
      components: "/src/components",
      store: "/src/store",
      types: "/src/types",
    },
  },
  
})